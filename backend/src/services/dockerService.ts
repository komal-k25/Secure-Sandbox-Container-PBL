import { exec } from 'child_process';
import util from "util";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";

const execAsync = util.promisify(exec);
const COMPOSE_FILES_DIR = path.resolve(__dirname, "../../vm-compose-files");

export async function createDockerContainer(vmId: number, vmName: string) {
    // 1. Create a unique port for the web-desktop (noVNC)
    // If vmId is 1, port is 6081. If vmId is 2, port is 6082.
    const novncPort = 6080 + vmId;
    const containerName = `ssem-vm-${vmId}`;

    // 2. This is the "Blueprint" for the VM
    const composeConfig = {
        version: "3.8",
        services: {
            sandbox_vm: {
                image: "accetto/ubuntu-vnc-xfce-g3",
                container_name: containerName,
                ports: [
                    // We map both 6080 and 6901 just to be safe
                    `0.0.0.0:${novncPort + 200}:6901`
                ],
                environment: [
                    "VNC_PW=password",
                    "STARTUP_WAIT=5"
                ],
                privileged: true,
                shm_size: '1gb'
            },
        },
    };

    // 3. Convert that Blueprint into a real .yml file
    const yamlStr = yaml.dump(composeConfig);
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.vm-${vmId}.yml`);

    await fs.mkdir(COMPOSE_FILES_DIR, { recursive: true });
    await fs.writeFile(filePath, yamlStr);

    // 4. Tell Docker to start the VM using that file
    // -p sets a unique project name so VMs don't overlap
    await execAsync(`docker-compose -f "${filePath}" -p "vm_${vmId}" up -d`);
    const realLink = `http://localhost:${novncPort + 200}/vnc.html`;

    return { port: novncPort, containerName, realLink };
}

export async function stopDockerContainer(vmId: number) {
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.vm-${vmId}.yml`);
    await execAsync(`docker-compose -f "${filePath}" -p "vm_${vmId}" stop`);
}

export async function removeDockerContainer(vmId: number) {
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.vm-${vmId}.yml`);

    // Stops the VM and wipes the temporary container data
    await execAsync(`docker-compose -f "${filePath}" -p "vm_${vmId}" down`);

    // Deletes the instruction file so your folder doesn't get messy
    await fs.unlink(filePath);
}