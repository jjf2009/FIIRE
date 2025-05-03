import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Leaf, GraduationCap, Sparkles } from "lucide-react";
import Papa from "papaparse";
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI("AIzaSyCiulXLd508QsIU7oD225ja-LT9GepNT3E"); // Replace with your real key

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
  const [schemes, setSchemes] = useState([]); // Save formatted scheme data

  function formatFundingData(data) {
    return {
      title: data["Program"],
      organization: data["Organization"],
      focusAreas: data["Focus_Area"]
        ? data["Focus_Area"].replace(/^\s*"(.*)"\s*$/, "$1").trim().split(",").map(f => f.trim())
        : [],
      support: data["Grant/Support"],
      deadline: data["Deadline"],
      applyLink: data["Link"],
    };
  }

  // Fetch and format schemes only once
  useEffect(() => {
    const fetchSchemes = async () => {
      const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1kiCFeQNcNGhn3MMlsKdg8EhDi4Qbamuy2NKPentn37a3L85gvJkABfAnlPYi-8IdVuEg7Pbi58-F/pub?output=csv";
      try {
        const res = await fetch(csvUrl);
        const text = await res.text();
        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });
        const formatted = parsed.data.map(formatFundingData);
        setSchemes(formatted);
      } catch (error) {
        console.error("Failed to fetch or parse CSV data:", error);
      }
    };

    fetchSchemes();
  }, []);

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
    You are a startup advisor with 10 years of experience. Your job is to analyze a startup's brief and recommend the top 3–5 relevant funding schemes from the list below.
    
    Startup Brief:
    "${startupBrief}"
    
    Available Schemes:
    ${JSON.stringify(schemes, null, 2)}
    
    Instructions:
    - Recommend 3–5 schemes.
    - For each, write:
       - The scheme title
       - A match score between 0 and 100
       - A short reason why the scheme fits
    - Format the output as a numbered list like this:
    1. Scheme Name (Score: 90)
       Reason: Explanation...
    2. ...
    3. ...
    
    Return only the numbered list in plain text. No extra commentary.
    `;
    

    try {
      const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
      const geminiResult = await model.generateContent(prompt);
      const text = geminiResult.response.text();
      setResult(text.trim());
    } catch (err) {
      console.error("Error calling Gemini:", err);
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
    <h3 className="font-semibold mb-2">Top Scheme Recommendations:</h3>
    <div className="space-y-2 text-sm">
      {result.split(/\n?\d+\.\s?/).filter(Boolean).map((item, index) => (
        <div key={index} className="bg-white p-3 rounded shadow-sm border">
          <strong>Scheme {index + 1}</strong>
          <p className="mt-1 whitespace-pre-wrap">{item.trim()}</p>
        </div>
      ))}
    </div>
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
    <TabsTrigger value="tech">
      <Lightbulb className="h-4 w-4 mr-2" />
      Tech
    </TabsTrigger>
    <TabsTrigger value="sustainable">
      <Leaf className="h-4 w-4 mr-2" />
      Sustainable
    </TabsTrigger>
    <TabsTrigger value="student">
      <GraduationCap className="h-4 w-4 mr-2" />
      Student
    </TabsTrigger>
  </TabsList>

  {[
    {
      value: "tech",
      content: `Our startup, HealthAI, is developing an AI-driven health diagnostics platform that leverages machine learning and wearable sensor data to provide early detection of chronic diseases. We're a team of 3 full-time founders, currently at the prototype stage, with a working MVP. Our company is registered but not yet incubated. We're running pilot trials in 2 clinics and aim to integrate with telemedicine platforms. We seek support to scale testing and improve AI accuracy.`,
    },
    {
      value: "sustainable",
      content: `EcoPack is building sustainable, biodegradable packaging solutions aimed at replacing single-use plastics in the FMCG sector. We are 2 graduate founders at the early product stage, with a working prototype. The startup is not registered yet but is incubated at ClimateLaunchpad. We've conducted small pilots with local organic brands and seek funding to scale production and gain regulatory certification.`,
    },
    {
      value: "student",
      content: `EduPro is a student-led initiative developing an AI-powered tutoring assistant for engineering students. We are 4 students from GCE Goa, currently in the prototype stage with a chatbot that answers course-related queries. The platform is being tested among 50 students. We're unregistered and not incubated, seeking support for product development and UI refinement.`,
    },
  ].map(({ value, content }) => (
    <TabsContent value={value} key={value}>
      <Card className="min-h-[200px] flex flex-col">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-700 whitespace-pre-line">{content}</p>
          <Button
            variant="ghost"
            className="mt-4 text-blue-600"
            onClick={() => handleExampleClick(content)}
          >
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
    content: `HealthAI is developing a software solution in the healthcare sector. We are a team of 3 founders who are full-time founders. Our company is registered and incubated at CIIE IIM Ahmedabad. We are in the early product phase with a working prototype. Our solution addresses delayed disease diagnosis through an AI-driven platform that analyzes medical images and patient history. We have onboarded 2 hospital partners and completed 150+ pilot scans. We seek support to achieve regulatory certification and full-scale deployment.`
  },
  {
    title: "Sustainable",
    icon: <Leaf className="h-4 w-4 mr-2" />,
    content: `EcoPack is developing a hardware solution in the packaging sector. We are a team of 2 founders who are graduate professionals. Our company is unregistered and not incubated. We are in the prototype phase with a functional prototype. Our solution addresses plastic waste pollution through biodegradable packaging made from seaweed-based materials. We have partnered with 2 local manufacturers and completed initial lab testing. We seek support to scale production and enter pilot markets.`
  },
  {
    title: "Student",
    icon: <GraduationCap className="h-4 w-4 mr-2" />,
    content: `EduPro is developing a software solution in the education sector. We are a team of 4 student founders who are graduate students. Our company is unregistered and incubated at our college's startup hub. We are in the beta phase with an AI-powered tutoring platform. Our solution addresses lack of personalized learning in schools through AI-based adaptive lesson plans and feedback. We have 500+ student users and are running pilots in 3 schools. We seek support to launch the public beta and onboard institutional partners.`
  }
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
