// Not using currently, but keeping this file for future use if we want to integrate Gemini for advanced AI features in the SSEM project.

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateChatResponse = async (message: string) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("DEBUG: GEMINI_API_KEY is missing from process.env");
            throw new Error("GEMINI_API_KEY is not set in the environment variables.");
        }

        console.log("DEBUG: Initializing Gemini with key (first 5 chars):", apiKey.substring(0, 5) + "...");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

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
        2. REFUSE OUT-OF-CONTEXT: If a user asks something unrelated (e.g., recipes, general news, or complex personal advice), politely state that you are specifically designed to help with the SSEM project.
        3. NO NEGATIVITY: If a user makes negative, harmful, or abusive queries about the project or anything else, decline to answer and steer them back to constructive project-related help.
        4. BE CONCISE & HELPFUL: Provide clear, actionable advice. Use markdown for better formatting.
        5. PROJECT NAME: Always refer to the project as "SSEM" or "Secure Sandbox Container".
        `;

        const prompt = `${systemContext}\n\nUser Question: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Error generating Gemini response:", error);
        if (error.message) {
            console.error("Error Message:", error.message);
        }
        throw error;
    }
};
