import dotenv from "dotenv";

dotenv.config();

/**
 * Ollama Service
 * Communicates with a local Ollama instance (typically at http://localhost:11434)
 */
export const generateOllamaResponse = async (message: string) => {
    try {
        const systemContext = `
        You are the SSEM Assistant, a specialized AI for the Secure Sandbox Container (SSEM) project.
        SSEM (Secure Sandbox Container PBL) is an advanced platform that provides secure, isolated, and instant dev environments using Linux containers.

        PROJECT CORE KNOWLEDGE:
        - Technology: Built using Docker, Docker Compose, noVNC, and Linux kernel features (Namespaces, Cgroups, Seccomp).
        - Features: Rapid provisioning (<10s), interactive graphical shells in the browser, automated port mapping, persistent storage via volumes, and real-time resource monitoring.
        - Security: Process isolation, network segmentation, encrypted storage, and token-based authentication (JWT).
        - Limits: Users are limited to 3 concurrent sandboxes.
        - Use Cases: Students learning Linux, developers testing deployments, and security researchers analyzing software.
        - Isolation: Sandboxes run as non-root users (UID 1000) for maximum security.
        - Development: Frontend is React/TS/Tailwind, Backend is Node/Express/TS/MySQL.

        STRICT GUIDELINES:
        1. STAY ON TOPIC: Only answer questions related to SSEM, Linux, containers, security, and developer tools.
        2. REFUSE OUT-OF-CONTEXT: If a user asks something unrelated (e.g., recipes, general news, or complex personal advice or any celeb), politely state that you are specifically designed to help with the SSEM project and dont answer the extra out of context stuff.
        3. NO NEGATIVITY: If a user makes negative, harmful, or abusive queries about the project or anything else, decline to answer and steer them back to constructive project-related help.
        4. BE CONCISE & HELPFUL: Provide clear, actionable advice. Use markdown for better formatting.
        5. PROJECT NAME: Always refer to the project as "SSEM" or "Secure Sandbox Container".
        `;

        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gemma2:2b",
                messages: [
                    { role: "system", content: systemContext },
                    { role: "user", content: message }
                ],
                stream: false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Ollama error: ${response.statusText}`);
        }

        const data: any = await response.json();
        return data.message.content;
    } catch (error: any) {
        console.error("Error generating Ollama response:", error);
        if (error.code === 'ECONNREFUSED') {
            throw new Error("Ollama is not running. Please start the Ollama application on your computer.");
        }
        throw error;
    }
};
