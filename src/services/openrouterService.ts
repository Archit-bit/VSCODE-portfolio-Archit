export const getChatbotResponse = async (
  userQuery: string
): Promise<string> => {
  try {
    // ✅ Use relative path so it works both locally & in production
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userQuery }),
    });

    const data = await response.json();
    console.log("🔹 API response:", data);

    return data.text || "No response from OpenRouter.";
  } catch (error) {
    console.error("🔻 API error:", error);
    return "I'm having trouble connecting to my OpenRouter brain right now. Please try again.";
  }
};
