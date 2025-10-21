// api/ai.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { prompt } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Missing OpenRouter API key." });
    }

    // Choose any model you like (Claude, GPT-4, etc.)
    const model = "meituan/longcat-flash-chat:free";

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://archit-vs-code-portfolio.vercel.app", // optional
          "X-Title": "Archit Portfolio Chatbot",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: `You are Archit Anurag Kaushik’s portfolio assistant. 
                      Respond conversationally and helpfully about his work, projects, or background.`,
            },
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? "No response";
    return res.status(200).json({ text });
  } catch (error) {
    console.error("OpenRouter error:", error);
    res.status(500).json({ error: "Failed to connect to OpenRouter." });
  }
}
