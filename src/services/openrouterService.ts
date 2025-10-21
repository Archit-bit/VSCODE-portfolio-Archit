export const getChatbotResponse = async (
  userQuery: string
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:5000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userQuery }),
    });

    const data = await response.json();
    console.log("🔹 API response:", data); // 👈 add this line
    return data.text || "No response from OpenRouter.";
  } catch (error) {
    console.error("🔻 API error:", error);
    return "I'm having trouble connecting to my OpenRouter brain right now. Please try again.";
  }
};
