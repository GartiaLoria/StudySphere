import { GoogleGenAI } from "@google/genai";

// ✅ Load API key from .env
const ai = new GoogleGenAI({ apiKey: "AIzaSyDSAXVApOQyFabb5FMmHDWNChPRWzaCO38" });

export const getGeminiResponse = async (userMessage) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't fetch a response.";
  }
};
