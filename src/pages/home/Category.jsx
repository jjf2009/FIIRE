import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sprout,
  GraduationCap,
  Leaf,
  ArrowRightCircle,
  BrainCircuit,
  Megaphone,
  Banknote 
} from "lucide-react";

const allCategories = [
  {
    icon: <Sprout className="h-10 w-10 text-emerald-500" />,
    title: "Agtech",
    description: "Smart farming, agri-supply chains, and rural tech",
  },
  {
    icon: <Leaf className="h-10 w-10 text-emerald-500" />,
    title: "Sustainability",
    description: "Green innovation, ESG solutions, and clean tech",
  },
  {
    icon: <Megaphone className="h-10 w-10 text-emerald-500" />,
    title: "Marketing",
    description: "Adtech, branding tools, and creator economy platforms",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-emerald-500" />,
    title: "AI",
    description: "Applied AI, generative models, and intelligent apps",
  },
  {
    icon: <Banknote className="h-10 w-10 text-emerald-500" />,
    title: "Fintech",
    description: "Banking, lending, UPI, and payment systems",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-emerald-500" />,
    title: "Edtech",
    description: "Online learning, test prep, and skilling platforms",
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    const route = `/schemes?sector=${category.toLowerCase()}`;
    navigate(route);
  };

  const handleExploreAll = () => {
    navigate("/categories");
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCategories.map((category, index) => (
          <Card
          key={index}
          onClick={() => handleClick(category.title)}
          className="border hover:shadow-md transition-shadow cursor-pointer"
        >
       <CardContent className=" flex flex-col items-center text-center">
  <div className="mb-2">{category.icon}</div>
  <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
  <p className="text-xs text-gray-600">{category.description}</p>
</CardContent>
        </Card>
        ))}

        {/* CTA Card */}
        <Card
          onClick={handleExploreAll}
          className="border hover:shadow-md transition-shadow cursor-pointer bg-emerald-50"
        >
          <CardContent className="flex flex-col items-center text-center">
            <ArrowRightCircle className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-emerald-700">Explore All Categories</h3>
            <p className="text-xs text-emerald-600">
              View 20+ sectors supported by various schemes
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Category;
