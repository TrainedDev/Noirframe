import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

export const geminiAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


