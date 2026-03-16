import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { pool } from '../config/db';
import { createDockerContainer, startDockerContainer, stopDockerContainer, removeDockerContainer } from '../services/dockerService';

const router = express.Router();

router.get('/info', (req, res) => {
    res.send("This is public sandbox info page.");
})

router.get('/vms', authenticateToken, async (req: any, res: any) => {
    try {
        const userID = req.user.id;

        const [vms] = await pool.execute(
            'SELECT * FROM virtual_machines WHERE user_id = ?',
            [userID]
        );

        res.status(200).json(vms);
    } catch (error) {
        console.error('Error fetching VMs: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// create a new VM (Crucial: Max 3 limit)
router.post('/vms', authenticateToken, async (req: any, res: any) => {
    try {
        const userID = req.user.id;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'VM name is required.' });
        }

        // Check limit (Max 3)
        const [rows]: any = await pool.execute(
            'SELECT COUNT(*) as vmCount FROM virtual_machines WHERE user_id = ?',
            [userID]
        );
        if (rows[0].vmCount >= 3) {
            return res.status(403).json({ error: 'Limit reached. Max 3 VMs allowed.' });
        }

        // 1. TRIGGER THE DOCKER MAGIC
        const dockerVM = await createDockerContainer(userID, name, rows[0].vmCount);

        // 2. ALIGN WITH YOUR DATABASE SCHEMA
        // Note: Column names must match: user_id, name, status, vnc_port, container_id, vnc_link
        const [result]: any = await pool.execute(
            'INSERT INTO virtual_machines (user_id, name, status, vnc_port, container_id, vnc_link) VALUES (?, ?, ?, ?, ?, ?)',
            [
                userID,
                name,
                'running',
                dockerVM.port,
                dockerVM.containerName,
                dockerVM.link // Make sure dockerService returns 'link'
            ]
        );

        res.status(201).json({
            message: 'VM created and started successfully!',
            id: result.insertId,
            container_id: dockerVM.containerName,
            link: dockerVM.link
        });

    } catch (error) {
        console.error('Error creating VM:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// --- Update VM Status ---
// Added "/vms" to match frontend: ${API_BASE}/vms/${id}/status
router.put('/vms/:id/status', authenticateToken, async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const vmId = req.params.id;
        const { status } = req.body;

        const [vms]: any = await pool.execute(
            'SELECT * FROM virtual_machines WHERE id = ? AND user_id = ?',
            [vmId, userId]
        );

        if (vms.length === 0) return res.status(404).json({ error: "VM not found" });

        const vm = vms[0];

        // IMPORTANT: You need to know which container index this is (0, 1, or 2)
        // For now, I'll leave it as 0, but you should fetch this from your DB
        const vmIndex = vm.vm_index || 0;

        if (status === 'running') {
            await startDockerContainer(userId, vmIndex);
        } else {
            await stopDockerContainer(userId, vmIndex);
        }

        await pool.execute(
            'UPDATE virtual_machines SET status = ? WHERE id = ?',
            [status, vmId]
        );

        res.json({ message: `VM is now ${status}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update status" });
    }
});

// --- Delete VM ---
// Added "/vms" to match frontend: ${API_BASE}/vms/${id}
router.delete('/vms/:id', authenticateToken, async (req: any, res: any) => {
    try {
        const userId = req.user.id;
        const vmId = req.params.id;

        const [vms]: any = await pool.execute(
            'SELECT * FROM virtual_machines WHERE id = ? AND user_id = ?',
            [vmId, userId]
        );

        if (vms.length === 0) return res.status(404).json({ error: "VM not found" });

        const vm = vms[0];
        const vmIndex = vm.vm_index || 0;

        await removeDockerContainer(userId, vmIndex);
        await pool.execute('DELETE FROM virtual_machines WHERE id = ?', [vmId]);

        res.json({ message: "VM deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;