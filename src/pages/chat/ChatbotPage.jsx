import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Leaf, GraduationCap, Sparkles } from 'lucide-react';

const ChatbotPage = () => {
  const [startupBrief, setStartupBrief] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Handle navigation or success state here
  };

  const handleExampleClick = (example) => {
    setStartupBrief(example);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Funding Finder for Startups</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your startup, and let our AI quickly match you with the most
          relevant government funding and grants available for your business.
          Simple, fast, and tailored to your needs!
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
            className="min-h-[120px]"
            value={startupBrief}
            onChange={(e) => setStartupBrief(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Boilerplate Format:
          </label>
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 border">
            [Company/Product Name] is developing a [hardware/software] solution in the [industry] 
            sector. We are a team of [number] founders who are [graduate/working professionals/
            full-time founders]. Our company is [registered/unregistered] and [incubated/not 
            incubated] at [incubator name, if applicable]. We are in the [stage: prototype/early 
            product/beta/deployed] phase with a [working prototype/early product]. Our solution 
            addresses [brief problem statement] through [brief explanation of technology]. We have 
            [traction details, e.g., initial users, pilot programs, partnerships]. We seek support to [next 
            milestone].
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          onClick={handleSubmit}
          disabled={isSubmitting || !startupBrief.trim()}
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
        <Tabs defaultValue="tech" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="tech">
              <Lightbulb className="h-4 w-4 mr-2" />
              Tech Startup
            </TabsTrigger>
            <TabsTrigger value="sustainable">
              <Leaf className="h-4 w-4 mr-2" />
              Sustainable Startup
            </TabsTrigger>
            <TabsTrigger value="student">
              <GraduationCap className="h-4 w-4 mr-2" />
              Student Startup
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tech">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700">
                  Our startup, HealthAI, is building an AI-driven health diagnostics platform combining machine 
                  learning and wearable sensor technology. Our team of three college graduates is currently in 
                  the prototype stage. The platform uses real-time data from wearable devices to predict potential 
                  health issues and offer personalized health recommendations. We are currently incubated at 
                  XYZ Incubator. We seek support to refine our prototype and expand our data processing 
                  capabilities.
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-blue-600"
                  onClick={() => handleExampleClick("Our startup, HealthAI, is building an AI-driven health diagnostics platform combining machine learning and wearable sensor technology. Our team of three college graduates is currently in the prototype stage. The platform uses real-time data from wearable devices to predict potential health issues and offer personalized health recommendations. We are currently incubated at XYZ Incubator. We seek support to refine our prototype and expand our data processing capabilities.")}
                >
                  Use this example
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sustainable">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700">
                  EcoPack is developing sustainable, biodegradable packaging materials to replace single-use 
                  plastics in the food and retail industry. Our team of four full-time founders, all college passouts, 
                  is in the proof-of-concept stage. We have a working prototype and are incubated at ABC 
                  Incubator. The solution reduces carbon footprints and promotes a greener planet. We seek 
                  funding to further test and scale production.
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-blue-600"
                  onClick={() => handleExampleClick("EcoPack is developing sustainable, biodegradable packaging materials to replace single-use plastics in the food and retail industry. Our team of four full-time founders, all college passouts, is in the proof-of-concept stage. We have a working prototype and are incubated at ABC Incubator. The solution reduces carbon footprints and promotes a greener planet. We seek funding to further test and scale production.")}
                >
                  Use this example
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="student">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700">
                  EduPro is a student-led initiative aiming to build an AI-driven tutoring platform that helps 
                  students master complex subjects through personalized learning. The platform uses natural 
                  language processing and machine learning to adapt to each student's learning style and pace. I 
                  am a college student and have gathered a small team of fellow students to work on the project. 
                  We are in the concept stage and need mentorship and funding to bring our idea to life, develop 
                  a prototype, and start testing in local schools.
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-4 text-blue-600"
                  onClick={() => handleExampleClick("EduPro is a student-led initiative aiming to build an AI-driven tutoring platform that helps students master complex subjects through personalized learning. The platform uses natural language processing and machine learning to adapt to each student's learning style and pace. I am a college student and have gathered a small team of fellow students to work on the project. We are in the concept stage and need mentorship and funding to bring our idea to life, develop a prototype, and start testing in local schools.")}
                >
                  Use this example
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChatbotPage;
