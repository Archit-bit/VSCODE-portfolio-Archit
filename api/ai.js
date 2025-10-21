// api/ai.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { PERSONAL_CONTEXT } from "../src/data/personalContext.js";

// ✅ load .env.local manually for local testing
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) dotenv.config({ path: envPath });

export default async function handler(req, res) {
  const { prompt } = req.body || {};

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Missing OpenRouter API key." });
  }

  try {
    const fullPrompt = `
You are an AI assistant inside Archit Anurag Kaushik’s interactive portfolio.
Always answer in first person (as the portfolio assistant),
using the personal and professional background below to guide your replies.

${PERSONAL_CONTEXT}

User: ${prompt}
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://archit-vs-code-portfolio.vercel.app",
          "X-Title": "Archit Portfolio Chatbot",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-30b-a3b:free",
          messages: [
            { role: "system", content: "You are Archit’s AI assistant." },
            { role: "user", content: fullPrompt },
          ],
        }),
      }
    );

    const data = await response.json();
    const text =
      data?.choices?.[0]?.message?.content ?? "No response from OpenRouter.";
    return res.status(200).json({ text });
  } catch (error) {
    console.error("💥 OpenRouter error:", error);
    return res.status(500).json({ error: "Failed to connect to OpenRouter." });
  }
}
