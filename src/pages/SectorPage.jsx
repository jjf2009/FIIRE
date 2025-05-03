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
import { Tag } from "lucide-react";

import {
  Cpu, Wifi, Bot, Globe2, Video, ShoppingCart, Code,
  HeartPulse, Building2, ShieldCheck, Microscope, Dumbbell,
  Utensils, Sprout, Leaf, Layers3, Users, Newspaper,
  PencilRuler, LayoutDashboard, Megaphone, Palette,
  Bus, PackageSearch, Gem, BrainCircuit, Banknote,
  Wallet, GraduationCap, BookOpenCheck, FlaskConical,
  TestTube2, UserPlus, BrainCog
} from "lucide-react";

const sectors = [
  {
    icon: <Cpu className="h-10 w-10 text-emerald-500" />,
    title: "Hardware",
    description: "Innovations in chips, boards, and physical tech products",
  },
  {
    icon: <Wifi className="h-10 w-10 text-emerald-500" />,
    title: "IoT",
    description: "Internet of Things devices and smart connectivity systems",
  },
  {
    icon: <Bot className="h-10 w-10 text-emerald-500" />,
    title: "Robotics",
    description: "Robotic automation and intelligent machine applications",
  },
  {
    icon: <Globe2 className="h-10 w-10 text-emerald-500" />,
    title: "Internet",
    description: "Web platforms, SaaS tools, and internet-based services",
  },
  {
    icon: <Video className="h-10 w-10 text-emerald-500" />,
    title: "Media",
    description: "Digital content, streaming, news, and entertainment",
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-emerald-500" />,
    title: "E-commerce",
    description: "Online marketplaces and consumer-focused platforms",
  },
  {
    icon: <Code className="h-10 w-10 text-emerald-500" />,
    title: "Software",
    description: "App development, platforms, and enterprise software",
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-emerald-500" />,
    title: "Healthtech",
    description: "Digital healthcare, diagnostics, and wellness solutions",
  },
  {
    icon: <Building2 className="h-10 w-10 text-emerald-500" />,
    title: "Real Estate",
    description: "Property tech, construction tech, and housing platforms",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-emerald-500" />,
    title: "Security",
    description: "Cybersecurity, surveillance, and public safety tech",
  },
  {
    icon: <Microscope className="h-10 w-10 text-emerald-500" />,
    title: "Medtech",
    description: "Devices, diagnostics, and medical technologies",
  },
  {
    icon: <Dumbbell className="h-10 w-10 text-emerald-500" />,
    title: "Wellness",
    description: "Mental health, fitness, and lifestyle improvement",
  },
  {
    icon: <Utensils className="h-10 w-10 text-emerald-500" />,
    title: "Foodtech",
    description: "Innovation in food delivery, agri-food, and alt-protein",
  },
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
    icon: <Layers3 className="h-10 w-10 text-emerald-500" />,
    title: "Tech",
    description: "Broad-spectrum tech ventures and platform innovation",
  },
  {
    icon: <Users className="h-10 w-10 text-emerald-500" />,
    title: "Social Impact",
    description: "Tech for good, NGOs, and inclusive development",
  },
  {
    icon: <Newspaper className="h-10 w-10 text-emerald-500" />,
    title: "Journalism",
    description: "Independent media, local news, and fact-checking tools",
  },
  {
    icon: <PencilRuler className="h-10 w-10 text-emerald-500" />,
    title: "Design",
    description: "UI/UX, product design, and creative tech tools",
  },
  {
    icon: <LayoutDashboard className="h-10 w-10 text-emerald-500" />,
    title: "Platforms",
    description: "Marketplace and SaaS platforms at scale",
  },
  {
    icon: <Megaphone className="h-10 w-10 text-emerald-500" />,
    title: "Marketing",
    description: "Adtech, branding tools, and creator economy platforms",
  },
  {
    icon: <Palette className="h-10 w-10 text-emerald-500" />,
    title: "Branding",
    description: "Digital branding, storytelling, and identity design",
  },
  {
    icon: <Bus className="h-10 w-10 text-emerald-500" />,
    title: "Mobility",
    description: "EVs, transport apps, logistics and last-mile delivery",
  },
  {
    icon: <PackageSearch className="h-10 w-10 text-emerald-500" />,
    title: "Retail",
    description: "Omni-channel commerce and retail tech solutions",
  },
  {
    icon: <Gem className="h-10 w-10 text-emerald-500" />,
    title: "Consumer Goods",
    description: "D2C brands, FMCG tech, and packaging innovation",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-emerald-500" />,
    title: "AI",
    description: "Applied AI, generative models, and intelligent apps",
  },
  {
    icon: <BrainCog className="h-10 w-10 text-emerald-500" />,
    title: "Machine Learning",
    description: "ML model development and data-driven solutions",
  },
  {
    icon: <Banknote className="h-10 w-10 text-emerald-500" />,
    title: "Fintech",
    description: "Banking, lending, UPI, and payment systems",
  },
  {
    icon: <Wallet className="h-10 w-10 text-emerald-500" />,
    title: "Insurance",
    description: "Insurtech innovations and policy automation",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-emerald-500" />,
    title: "Edtech",
    description: "Online learning, test prep, and skilling platforms",
  },
  {
    icon: <BookOpenCheck className="h-10 w-10 text-emerald-500" />,
    title: "Education",
    description: "Institutional learning and hybrid schooling tech",
  },
  {
    icon: <FlaskConical className="h-10 w-10 text-emerald-500" />,
    title: "Biotech",
    description: "Bioengineering, genomics, and life sciences R&D",
  },
  {
    icon: <TestTube2 className="h-10 w-10 text-emerald-500" />,
    title: "Deep Tech",
    description: "Frontier innovation in quantum, nano, and hard sciences",
  },
  {
    icon: <UserPlus className="h-10 w-10 text-emerald-500" />,
    title: "Female Entrepreneurs",
    description: "Women-led startups and diversity-focused ventures",
  },
];


const SectorPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const isMobile = window.innerWidth < 640;
  const itemsPerPage = isMobile ? 6 : 12;
  const totalPages = Math.ceil(sectors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSectors = sectors.slice(startIndex, startIndex + itemsPerPage);

  const handleClick = (sector) => {
    navigate(`/schemes?sector=${encodeURIComponent(sector)}`);
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Browse by Sector</h2>

      <div
        className={`grid gap-6 ${
          isMobile ? "grid-cols-2" : "sm:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {paginatedSectors.map((sector, index) => (
           <Card
                      key={index}
                      onClick={() => handleClick(sector.title)}
                      className="border hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="mb-4">{sector.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
                        <p className="text-sm text-gray-600">{sector.description}</p>
                      </CardContent>
                    </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
              </PaginationItem>
              <PaginationItem>
                <span className="px-4 text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
};

export default SectorPage;
