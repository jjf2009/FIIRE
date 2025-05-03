import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const tracks = `
1. Startup India Seed Fund Scheme (SISFS): For early-stage startups with MVP, product development needs, or initial market entry.
2. MeitY TIDE 2.0: For tech startups (especially hardware+software) in emerging technologies like IoT, AI, Blockchain, etc.
3. NIDHI-PRAYAS: For hardware startups that need prototyping support.
4. DST NIDHI-EIR: For individual founders needing stipend support while pursuing full-time startup development.
`;

export async function classifyStartup(brief) {
    const prompt = `
You are an AI startup advisor. Your task is to analyze the startup's brief and rank the tracks from highest to lowest likelihood of eligibility.
Deeply understand what the startup is doing and all of its nuances and make sure you take into account all the eligibility criteria such as hardware, software, etc.

Here are the 4 tracks and their eligibility criteria:
${tracks}

Startup Brief: "${brief}"

Based on the brief, return only a ranked list of track names from highest to lowest likelihood. Number them. If no track is a fit, return "None".
Reply in a clean format, with only the track names, one per line, no extra commentary.
`;

  try {
    const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"});

    const result = await model.generateContent(prompt);
    const response = result.response;

    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Error Calling Gemini: ", error);
    return "An error Occured: " + error.message;
  }
}

