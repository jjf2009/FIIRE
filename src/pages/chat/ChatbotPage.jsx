import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Leaf, GraduationCap, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI('AIzaSyCiulXLd508QsIU7oD225ja-LT9GepNT3E');

const tracks = `
1. Startup India Seed Fund Scheme (SISFS): For early-stage startups with MVP, product development needs, or initial market entry.
2. MeitY TIDE 2.0: For tech startups (especially hardware+software) in emerging technologies like IoT, AI, Blockchain, etc.
3. NIDHI-PRAYAS: For hardware startups that need prototyping support.
4. DST NIDHI-EIR: For individual founders needing stipend support while pursuing full-time startup development.
`;

const boilerplateText = `[Company/Product Name] is developing a [hardware/software] solution in the [industry] 
sector. We are a team of [number] founders who are [graduate/working professionals/
full-time founders]. Our company is [registered/unregistered] and [incubated/not 
incubated] at [incubator name, if applicable]. We are in the [stage: prototype/early 
product/beta/deployed] phase with a [working prototype/early product]. Our solution 
addresses [brief problem statement] through [brief explanation of technology]. We have 
[traction details, e.g., initial users, pilot programs, partnerships]. We seek support to [next 
milestone].`;

const ChatbotPage = () => {
  const [startupBrief, setStartupBrief] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!startupBrief.trim()) {
      setError("Startup brief cannot be empty.");
      return;
    }

    if (startupBrief.trim() === boilerplateText.trim()) {
      setError("Please modify the boilerplate text to describe your startup.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    const prompt = `
You are an AI startup advisor. Your task is to analyze the startup's brief and rank the tracks from highest to lowest likelihood of eligibility.
Deeply understand what the startup is doing and all of its nuances and make sure you take into account all the eligibility criteria such as hardware, software, etc.

Here are the 4 tracks and their eligibility criteria:
${tracks}

Startup Brief: "${startupBrief}"

Based on the brief, return only a ranked list of track names from highest to lowest likelihood. Number them. If no track is a fit, return "None".
Reply in a clean format, with only the track names, one per line, no extra commentary.
`;

    try {
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const geminiResult = await model.generateContent(prompt);
      const text = geminiResult.response.text();
      setResult(text.trim());
    } catch (err) {
      console.error("Error Calling Gemini: ", err);
      setResult("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setStartupBrief(example);
    setError("");
    setResult("");
  };

  const handleBoilerplateClick = () => {
    setStartupBrief(boilerplateText);
    setError("");
    setResult("");
  };

  return (
    <div className="container px-4 py-10 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Funding Finder for Startups</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Describe your startup, and let our AI quickly match you with the most
          relevant government funding and grants available for your business.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="startup-brief" className="block text-sm font-medium mb-2">
            Enter Startup Brief:
          </label>
          <Textarea
            id="startup-brief"
            placeholder="Describe your startup's mission, product/service, target market, and unique value proposition..."
            className="min-h-[140px] resize-y"
            value={startupBrief}
            onChange={(e) => setStartupBrief(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={loading}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? "Analyzing..." : "Analyze Eligibility"}
        </Button>

        {result && (
          <div className="p-4 mt-4 bg-gray-100 border rounded-md">
            <h3 className="font-semibold mb-2">Top Funding Track Matches:</h3>
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Boilerplate Format (click to use):</label>
          <div
            className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 border cursor-pointer whitespace-pre-line"
            onClick={handleBoilerplateClick}
          >
            {boilerplateText}
          </div>
        </div>

        <Button variant="outline" className="w-full text-blue-600">
          Please provide feedback to make this tool better
        </Button>
      </div>

      {/* Examples */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Example Prompts</h2>

        <div className="hidden sm:block">
          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="grid grid-cols-3 gap-2 mb-4">
              <TabsTrigger value="tech"><Lightbulb className="h-4 w-4 mr-2" />Tech</TabsTrigger>
              <TabsTrigger value="sustainable"><Leaf className="h-4 w-4 mr-2" />Sustainable</TabsTrigger>
              <TabsTrigger value="student"><GraduationCap className="h-4 w-4 mr-2" />Student</TabsTrigger>
            </TabsList>

            {[
              { value: "tech", content: `Our startup, HealthAI, is building an AI-driven health diagnostics platform combining machine learning and wearable sensor technology...` },
              { value: "sustainable", content: `EcoPack is developing sustainable, biodegradable packaging materials to replace single-use plastics...` },
              { value: "student", content: `EduPro is a student-led initiative aiming to build an AI-driven tutoring platform...` },
            ].map(({ value, content }) => (
              <TabsContent value={value} key={value}>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
                    <Button variant="ghost" className="mt-4 text-blue-600" onClick={() => handleExampleClick(content)}>
                      Use this example
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="block sm:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {[
                {
                  title: "Tech Startup",
                  icon: <Lightbulb className="h-4 w-4 mr-2" />,
                  content: `Our startup, HealthAI, is building an AI-driven health diagnostics platform...`,
                },
                {
                  title: "Sustainable",
                  icon: <Leaf className="h-4 w-4 mr-2" />,
                  content: `EcoPack is developing biodegradable packaging to replace single-use plastics...`,
                },
                {
                  title: "Student",
                  icon: <GraduationCap className="h-4 w-4 mr-2" />,
                  content: `EduPro is a student-led AI-driven tutoring platform to help students learn faster...`,
                },
              ].map(({ title, icon, content }, idx) => (
                <CarouselItem key={idx} className="basis-full">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">{icon} {title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
                      <Button variant="ghost" className="mt-4 text-blue-600" onClick={() => handleExampleClick(content)}>
                        Use this example
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
