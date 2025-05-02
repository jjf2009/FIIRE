// components/StartupBriefInput.tsx
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Groq from "groq-sdk";

// Eligibility criteria for the four tracks
// const tracks = {
//   "NIDHI Prayas": `Eligibility: Indian entrepreneurs with a technology-based startup at the proof-of-concept stage. No age limit. Must have a hardware product. Must have a working prototype. Incubated at DST recognized incubator.`,
//   "NIDHI EIR": `Eligibility: Indian citizens, 18+ years, with a tech-based idea/startup. Must be full-time. Idea should be impactful and incubated.`,
//   "NIDHI SSS": `Eligibility: Tech startups < 2 years old. 51% Indian-owned. Registered at recognized incubator. Must have a business plan and technical competence.`,
//   "Startup India Seed Fund": `Eligibility: DPIIT-registered, < 2 years old, scalable, tech-driven. Shouldn’t have received ₹10L+ from other govt schemes. Incubated.`,
// };

// const groq = new Groq({
//   apiKey:' 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',
// });

const StartupBriefInput = ({ value, onChange, error }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

//   const generatePrompt = (brief) => {
//     return `
// You are an AI startup advisor. Your task is to analyze the startup's brief and rank the tracks from highest to lowest likelihood of eligibility.
// Understand what the startup is doing and consider all eligibility criteria such as hardware/software distinctions.

// Here are the 4 tracks and their eligibility criteria:
// ${Object.entries(tracks)
//   .map(([track, criteria]) => `${track}: ${criteria}`)
//   .join("\n\n")}

// Startup Brief: "${brief}"

// Return a numbered ranked list of track names only. If no track fits, return "None".
// Example format:
// 1. Track A
// 2. Track B
// 3. Track C
// 4. Track D
// `;
//   };

//   const handleSubmit = async () => {
//     if (!value.trim()) return;

//     setLoading(true);
//     setResult(null);
//     try {
//       const response = await groq.chat.completions.create({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: generatePrompt(value) }],
//       });

//       const reply = response.choices[0].message.content.trim();
//       setResult(reply);
//     } catch (err) {
//       console.error("Error generating response:", err);
//       setResult("An error occurred while analyzing.");
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="startup-brief" className="block text-sm font-medium mb-2">
          Enter Startup Brief:
        </label>
        <Textarea
          id="startup-brief"
          placeholder="Describe your startup's mission, product/service, target market, and unique value proposition..."
          className="min-h-[140px] resize-y"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      <Button
        className="bg-blue-600 hover:bg-blue-700"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Eligibility"}
      </Button>

      {result && (
        <div className="p-4 mt-4 bg-gray-100 border rounded-md">
          <h3 className="font-semibold mb-2">Top Funding Track Matches:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default StartupBriefInput;
