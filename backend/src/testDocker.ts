import { createDockerContainer } from "./services/dockerService";

async function test() {
    console.log("🚀 Launching Final Sandbox Test...");
    try {
        // We use ID 201 to avoid conflicts with your previous tests
        // Passing 0 as the 3rd argument (vmCount)
        const result = await createDockerContainer(201, "Final-Demo-OS", 0);

        console.log("-----------------------------------------");
        console.log(`✅ VM SUCCESSFULLY STARTED!`);
        console.log(`📦 Container: ${result.containerName}`);
        console.log(`🔗 REAL LINK: ${result.link}`);
        console.log("-----------------------------------------");
        console.log("Wait 15 seconds for boot, then click the link above.");

    } catch (error) {
        console.error("❌ Orchestrator Error:", error);
    }
}

test();

// npx ts-node src/testDocker.ts