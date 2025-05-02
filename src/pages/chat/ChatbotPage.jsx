import { useState } from "react";
import { Button } from "@/components/ui/button";
// import StartupBriefInput from "./StartupBriefInput";
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Leaf, GraduationCap, Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    // Handle result here
  };

  const handleExampleClick = (example) => {
    setStartupBrief(example);
    setError("");
  };

  const handleBoilerplateClick = () => {
    setStartupBrief(boilerplateText);
    setError("");
  };

  return (
    <div className="container px-4 py-10 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Funding Finder for Startups</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Describe your startup, and let our AI quickly match you with the most
          relevant government funding and grants available for your business.
          Simple, fast, and tailored to your needs!
        </p>
      </div>

      <div className="space-y-6">
      {/* <StartupBriefInput
  value={startupBrief}
  onChange={setStartupBrief}
  error={error}
/> */}


        <div>
          <label className="block text-sm font-medium mb-2">
            Boilerplate Format (click to use):
          </label>
          <div
            className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 border cursor-pointer whitespace-pre-line"
            onClick={handleBoilerplateClick}
          >
            {boilerplateText}
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isSubmitting ? "Analyzing..." : "Classify Startup"}
        </Button>

        <Button variant="outline" className="w-full text-blue-600">
          Please provide feedback to make this tool better
        </Button>
      </div>
      <div className="mt-12">
  <h2 className="text-xl font-bold mb-6">Example Prompts</h2>

  {/* Desktop Tabs */}
  <div className="hidden sm:block">
    <Tabs defaultValue="tech" className="w-full">
      <TabsList className="grid grid-cols-3 gap-2 mb-4">
        <TabsTrigger value="tech">
          <Lightbulb className="h-4 w-4 mr-2" />
          Tech Startup
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
          content: `Our startup, HealthAI, is building an AI-driven health diagnostics platform combining machine learning and wearable sensor technology...`,
        },
        {
          value: "sustainable",
          content: `EcoPack is developing sustainable, biodegradable packaging materials to replace single-use plastics in the food and retail industry...`,
        },
        {
          value: "student",
          content: `EduPro is a student-led initiative aiming to build an AI-driven tutoring platform that helps students master complex subjects...`,
        },
      ].map(({ value, content }) => (
        <TabsContent value={value} key={value}>
          <Card>
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
          content: `Our startup, HealthAI, is building an AI-driven health diagnostics platform combining machine learning and wearable sensor technology...`,
        },
        {
          title: "Sustainable",
          icon: <Leaf className="h-4 w-4 mr-2" />,
          content: `EcoPack is developing sustainable, biodegradable packaging materials to replace single-use plastics in the food and retail industry...`,
        },
        {
          title: "Student",
          icon: <GraduationCap className="h-4 w-4 mr-2" />,
          content: `EduPro is a student-led initiative aiming to build an AI-driven tutoring platform that helps students master complex subjects...`,
        },
      ].map(({ title, icon, content }, idx) => (
        <CarouselItem key={idx} className="basis-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                {icon} {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
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
