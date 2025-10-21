/*import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { PERSONAL_CONTEXT } from "./src/data/personalContext.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  const userPrompt = req.body.prompt;

  const fullPrompt = `
You are an AI assistant inside Archit Kaushik's interactive portfolio.
Always answer based on his professional profile and project details below.

${PERSONAL_CONTEXT}

User: ${userPrompt}
`;

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Missing OpenRouter API key." });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
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
    const text = data?.choices?.[0]?.message?.content ?? "No response";
    res.status(200).json({ text });
  } catch (err) {
    console.error("OpenRouter error:", err);
    res.status(500).json({ error: "Failed to connect to OpenRouter." });
  }
});

app.listen(5000, () =>
  console.log("✅ Local API running on http://localhost:5000")
);*/
