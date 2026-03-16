import { exec } from 'child_process';
import util from "util";
import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";

const execAsync = util.promisify(exec);
const COMPOSE_FILES_DIR = path.resolve(__dirname, "../../vm-compose-files");

// Change: Ensure we use vmCount to create unique offsets
export async function createDockerContainer(userId: number, vmName: string, vmCount: number) {

    // 1. Create a truly unique port and name
    // If User 3 has 0 VMs, port is 6280. If they have 1 VM, port is 6281.
    const portOffset = userId + vmCount;
    const novncPort = 6280 + portOffset;

    // Unique name prevents Docker "Name already in use" errors
    const containerName = `ssem-vm-u${userId}-n${vmCount}`;
    const projectName = `vm_u${userId}_n${vmCount}`;

    // 2. Updated Blueprint
    const composeConfig = {
        version: "3.8",
        services: {
            sandbox_vm: {
                image: "accetto/ubuntu-vnc-xfce-g3",
                container_name: containerName,
                ports: [
                    // Mapping to the calculated unique port
                    `0.0.0.0:${novncPort}:6901`
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

    // 3. Save unique .yml file
    const yamlStr = yaml.dump(composeConfig);
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.${projectName}.yml`);

    await fs.mkdir(COMPOSE_FILES_DIR, { recursive: true });
    await fs.writeFile(filePath, yamlStr);

    // 4. Start Docker
    await execAsync(`docker-compose -f "${filePath}" -p "${projectName}" up -d`);

    // The link now uses the correctly mapped port
    const realLink = `http://localhost:${novncPort}/vnc.html?autoconnect=true`;

    return {
        port: novncPort,
        containerName,
        link: realLink
    };
}

export async function startDockerContainer(userId: number, vmCount: number) {
    const projectName = `vm_u${userId}_n${vmCount}`;
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.${projectName}.yml`);

    // Starts the existing container defined in the yml
    await execAsync(`docker-compose -f "${filePath}" -p "${projectName}" start`);
}

export async function stopDockerContainer(userId: number, vmCount: number) {
    const projectName = `vm_u${userId}_n${vmCount}`;
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.${projectName}.yml`);

    // Stops the running container
    await execAsync(`docker-compose -f "${filePath}" -p "${projectName}" stop`);
}

export async function removeDockerContainer(userId: number, vmCount: number) {
    const projectName = `vm_u${userId}_n${vmCount}`;
    const filePath = path.join(COMPOSE_FILES_DIR, `docker-compose.${projectName}.yml`);

    // 'down' stops and removes the container and network
    await execAsync(`docker-compose -f "${filePath}" -p "${projectName}" down`);

    // Delete the physical yml file
    if (await fs.stat(filePath).catch(() => false)) {
        await fs.unlink(filePath);
    }
}