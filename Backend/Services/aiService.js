import { geminiAi } from "../config/geminiAi.js";
import { groqAi } from "../config/groqAi.js";
import { appError } from "../utils/helperFunc.js";

export const giveMovieFromPromptWithGemini = async (moviePrompt) => {
  console.log("Fetching response from gemini...");
  
  if (!moviePrompt) throw appError("required movie prompt not found", 400);

  const response = await geminiAi.models
    .generateContent({
      model: "gemini-2.5-flash",
      contents: `Give 2 or 3 movie names for: "${moviePrompt}"

Return ONLY a similar JSON array  like:
["movie1", "movie2", "movie3"]`,
    })
    .catch((err) => {
      const parsedErrMsg = JSON.parse(err.message || "{}");
      const errMsg = parsedErrMsg?.error;
       console.log("gemini error", errMsg.message || "AI failed", errMsg.code || 500);
      return false;
    });

    // console.log(response, response.text);
    
  const movieName = response  ? response.text : "[]";

  
let movieArr = [];

try {
  movieArr = JSON.parse(movieName);
} catch (e) {
  console.log("Invalid JSON from AI", e);
  movieArr = [];
}

return movieArr;
};

export const giveMovieFromPromptWithGroq = async (moviePrompt) => {
    console.log("Failed to get response from Gemini, trying with Groq...");

  const response = await groqAi.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: `Give 2 or 3 movie names for: "${moviePrompt}"

Return ONLY a similar JSON array  like:
["movie1", "movie2", "movie3"]`,
        },
      ],
      model: "openai/gpt-oss-20b",
    })
    .catch((err) => {
      const parsedErrMsg = JSON.parse(err.message || "{}");
      const errMsg = parsedErrMsg?.error;

      throw appError(errMsg.message || "AI failed", errMsg.code || 500);
    });
  
  const movieName = response.choices[0]?.message?.content || "[]";

  // console.log(movieName);

  return JSON.parse(movieName);
};
