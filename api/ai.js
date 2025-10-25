// api/ai.js
import dotenv from "dotenv";
dotenv.config();

// IMPORTANT: keep this as a JS file in your repo at deploy time:
import { personalContext } from "../src/data/personalContext.js";

export default async function handler(req, res) {
  // version header so you can confirm you hit latest code
  res.setHeader("x-bot-version", "ctx-qwen3-30b-free-v1");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey)
    return res.status(500).json({ error: "Missing OpenRouter API key." });

  // Prove the context was actually imported at runtime
  const ctxLen =
    typeof personalContext === "string" ? personalContext.length : -1;
  res.setHeader("x-bot-ctx-len", String(ctxLen));

  try {
    const { prompt } = req.body ?? {};

    const system = `
You are Archit Anurag Kaushik’s portfolio assistant.

STYLE:
- Helpful, concise, technically confident, lightly sarcastic.
- Sprinkle tasteful programming memes (off-by-one, "works on my machine", rubber duck debugging) when it helps.
- Never rude or profane. If unknown, say so and propose next steps.

CONTEXT (use this as ground truth about Archit):
${personalContext}

POLICY:
- Do NOT say you lack information if the answer is derivable from CONTEXT.
- Prefer bullet points and precise tech terms when summarizing projects/skills.
`.trim();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://archit-s-vs-code-portfolio-1.vercel.app",
          "X-Title": "Archit Portfolio Chatbot",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-30b-a3b:free",
          messages: [
            {
              role: "system",
              content: "Follow the system instructions strictly.",
            },
            { role: "system", content: system },
            {
              role: "user",
              content:
                prompt || "Tell me about Archit's projects from the context.",
            },
          ],
          temperature: 0.6,
          top_p: 0.9,
        }),
      }
    );

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return res.status(500).json({ error: "Invalid JSON from OpenRouter." });
    }
    if (data.error)
      return res
        .status(500)
        .json({ error: data.error.message || "Provider returned error" });

    const text =
      data?.choices?.[0]?.message?.content ?? "No response from OpenRouter.";
    return res.status(200).json({ text });
  } catch (err) {
    console.error("OpenRouter error:", err);
    return res.status(500).json({ error: "Failed to connect to OpenRouter." });
  }
}
