import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Briefcase,
  GraduationCap,
  Leaf,
  Lightbulb,
  Heart,
  Globe,
  Home,
  Users,
  ShieldCheck,
  Plane,
  Landmark,
  Coins,
  Hammer,
  Flame,
  Factory,
  Stethoscope,
  Truck,
  Rocket,
  Palette,
  BookOpen,
} from "lucide-react";

const allCategories = [
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
  {
    icon: <Heart className="h-10 w-10 text-emerald-500" />,
    title: "Healthcare",
    description: "Schemes for hospitals, clinics, and public health services",
  },
  {
    icon: <Globe className="h-10 w-10 text-emerald-500" />,
    title: "Environment",
    description: "Programs for climate action, green tech, and sustainability",
  },
  {
    icon: <Home className="h-10 w-10 text-emerald-500" />,
    title: "Housing",
    description: "Support for affordable housing and urban development",
  },
  {
    icon: <Users className="h-10 w-10 text-emerald-500" />,
    title: "Social Welfare",
    description: "Aid for marginalized communities and welfare schemes",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-emerald-500" />,
    title: "Security",
    description: "Grants for disaster management and public safety",
  },
  {
    icon: <Plane className="h-10 w-10 text-emerald-500" />,
    title: "Tourism",
    description: "Support for travel, heritage, and cultural tourism projects",
  },
  {
    icon: <Landmark className="h-10 w-10 text-emerald-500" />,
    title: "Governance",
    description: "Funding for e-governance and civic tech initiatives",
  },
  {
    icon: <Coins className="h-10 w-10 text-emerald-500" />,
    title: "Finance",
    description: "Schemes for fintech, NBFCs, and financial inclusion",
  },
  {
    icon: <Hammer className="h-10 w-10 text-emerald-500" />,
    title: "Infrastructure",
    description: "Capital for roads, bridges, and smart cities",
  },
  {
    icon: <Flame className="h-10 w-10 text-emerald-500" />,
    title: "Energy",
    description: "Programs in renewable energy and power generation",
  },
  {
    icon: <Factory className="h-10 w-10 text-emerald-500" />,
    title: "Manufacturing",
    description: "Support for MSMEs and industrial growth",
  },
  {
    icon: <Stethoscope className="h-10 w-10 text-emerald-500" />,
    title: "Medical Innovation",
    description: "Funding for biotech, pharma, and medical research",
  },
  {
    icon: <Truck className="h-10 w-10 text-emerald-500" />,
    title: "Logistics",
    description: "Schemes for supply chain, warehousing, and transport",
  },
  {
    icon: <Rocket className="h-10 w-10 text-emerald-500" />,
    title: "Space & Tech",
    description: "Support for aerospace, robotics, and deep tech ventures",
  },
  {
    icon: <Palette className="h-10 w-10 text-emerald-500" />,
    title: "Art & Culture",
    description: "Grants for artists, museums, and cultural preservation",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-emerald-500" />,
    title: "Skill Development",
    description: "Training programs for youth, women, and upskilling",
  },
];


const Category = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive items per page
  const isMobile = window.innerWidth < 640;
  const itemsPerPage = isMobile ? 3 : 6;

  const totalPages = Math.ceil(allCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = allCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleClick = (category) => {
    const route = `/schemes?sector=${category.toLowerCase()}`;
    navigate(route);
  };

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>

      <div
        className={`grid gap-6 ${
          isMobile ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {paginatedCategories.map((category, index) => (
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

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrev} />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default Category;
