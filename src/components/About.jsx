import { Lightbulb, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <Lightbulb className="h-8 w-8 text-emerald-500" />,
    title: "Empowering Innovation",
    description:
      "We help startups, businesses, and individuals discover and apply for government schemes that support growth and innovation.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-emerald-500" />,
    title: "Verified Information",
    description:
      "All scheme data is sourced from reliable government portals and is regularly updated to ensure accuracy and transparency.",
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-500" />,
    title: "Built for Everyone",
    description:
      "Whether you're a student, farmer, entrepreneur, or researcher — our platform is designed to serve every citizen’s needs.",
  },
];

const About = () => {
  return (
    <div className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
        Our mission is to simplify access to government schemes in India by creating a centralized,
        user-friendly portal. We believe that funding and opportunities should be accessible to all —
        not buried under bureaucracy or lost in outdated websites.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <Card key={idx} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default About;
