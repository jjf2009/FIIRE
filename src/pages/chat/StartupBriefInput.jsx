import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI('');

const tracks = `
1. Startup India Seed Fund Scheme (SISFS): For early-stage startups with MVP, product development needs, or initial market entry.
2. MeitY TIDE 2.0: For tech startups (especially hardware+software) in emerging technologies like IoT, AI, Blockchain, etc.
3. NIDHI-PRAYAS: For hardware startups that need prototyping support.
4. DST NIDHI-EIR: For individual founders needing stipend support while pursuing full-time startup development.
`;

const StartupBriefInput = ({ value, onChange, error }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setLoading(true);
    setResult("");

    const prompt = `
You are an AI startup advisor. Your task is to analyze the startup's brief and rank the tracks from highest to lowest likelihood of eligibility.
Deeply understand what the startup is doing and all of its nuances and make sure you take into account all the eligibility criteria such as hardware, software, etc.

Here are the 4 tracks and their eligibility criteria:
${tracks}

Startup Brief: "${value}"

Based on the brief, return only a ranked list of track names from highest to lowest likelihood. Number them. If no track is a fit, return "None".
Reply in a clean format, with only the track names, one per line, no extra commentary.
`;

    try {
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      setResult(text.trim());
    } catch (error) {
      console.error("Error Calling Gemini: ", error);
      setResult("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

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
