import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from 'dotenv'; configDotenv()
const gemini_api_key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function promptGemini(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}