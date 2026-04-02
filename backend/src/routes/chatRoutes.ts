import express from 'express';
import { generateOllamaResponse } from '../services/ollamaService';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/chat', authenticateToken, async (req: any, res: any) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required." });
        }

        console.log("DEBUG: Processing chat with Local Ollama...");
        const response = await generateOllamaResponse(message);
        res.status(200).json({ response });
    } catch (error: any) {
        console.error("Error in /chat route:", error);
        
        if (error.message && error.message.includes("Ollama is not running")) {
            return res.status(503).json({ 
                error: "The AI assistant is temporarily unavailable because Ollama is not running on your computer. Please open the Ollama application." 
            });
        }

        res.status(500).json({ error: "The AI assistant is temporarily unavailable. Error: " + (error.message || "Internal Server Error") });
    }
});

export default router;
