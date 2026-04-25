import Groq from "groq-sdk";
import { config } from "dotenv";

config();

export const groqAi = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
