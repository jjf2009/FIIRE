import { Briefcase, GraduationCap, Leaf, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: <Briefcase className="h-10 w-10 text-emerald-500" />,
    title: "Business",
    description: "Grants and loans for startups, SMEs, and enterprises",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-emerald-500" />,
    title: "Education",
    description: "Financial aid for students, schools, and education institutions",
  },
  {
    icon: <Leaf className="h-10 w-10 text-emerald-500" />,
    title: "Agriculture",
    description: "Support for farmers, agri businesses and rural development",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-emerald-500" />,
    title: "Research",
    description: "Funding for scientific research and innovation projects",
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    const route = `/schemes/${category.toLowerCase()}`;
    navigate(route);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={index}
            onClick={() => handleClick(category.title)}
            className="border hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Category;

