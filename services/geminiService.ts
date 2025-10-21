import { GoogleGenAI } from "@google/genai";
import { FULL_PORTFOLIO_DATA } from '../constants';

// Fix: Per Gemini API guidelines, the API key should be passed directly from process.env without type casting.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const portfolioContext = `
You are a friendly, helpful AI assistant for Archit Anurag Kaushik's personal portfolio.
Your goal is to answer questions about Archit based on the information provided below.
Be conversational, encouraging, and provide information in a clear, concise way.
Do not make up information. If you don't know the answer, say that you can't find that information in your knowledge base.

Here is Archit's portfolio data:

--- ABOUT HIM ---
${FULL_PORTFOLIO_DATA.ABOUT_CONTENT}

--- HIS PROJECTS ---
${FULL_PORTFOLIO_DATA.PROJECTS_CONTENT}

--- HOW TO CONTACT HIM ---
${FULL_PORTFOLIO_DATA.CONTACT_CONTENT}
---
`;

export const getChatbotResponse = async (userQuery: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "I'm sorry, my connection to the AI brain is not configured. Please check the API key.";
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            // Fix: The user query should be passed directly to 'contents'. The context is already being passed in 'systemInstruction'.
            contents: userQuery,
            config: {
                systemInstruction: portfolioContext,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API error:", error);
        return "I'm having a little trouble connecting to my circuits right now. Please try again in a moment.";
    }
};
