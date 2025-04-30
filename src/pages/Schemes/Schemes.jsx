import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SchemeCard from "./SchemeCard";
import SchemeSearchBar from "./SchemeSearchBar";
import Banner from "./Banner";

const mockSchemes = [
  {
    name: "Startup India Seed Fund",
    organization: "Startup India",
    deadline: "2025-06-01",
    status: "open",
    link: "https://startupindia.gov.in/",
    category: "startup",
  },
  {
    name: "PM Kisan Samman",
    organization: "Gov of India",
    deadline: null,
    status: "open",
    link: "https://pmkisan.gov.in/",
    category: "agriculture",
  },
  {
    name: "Women Entrepreneur Grant",
    organization: "Niti Aayog",
    deadline: "2025-08-20",
    status: "closed",
    link: "https://niti.gov.in",
    category: "women",
  },
];

const Schemes = () => {
  const [searchParams] = useSearchParams();
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const name = searchParams.get("name")?.toLowerCase();
    const sector = searchParams.get("sector")?.toLowerCase();

    let filtered = mockSchemes.filter((s) => s.status === "open");
    if (name) filtered = filtered.filter((s) => s.name.toLowerCase().includes(name));
    if (sector) filtered = filtered.filter((s) => s.category === sector);

    setSchemes(filtered);
  }, [searchParams]);

  const categoryTitle = searchParams.get("sector")
    ? `${searchParams.get("sector").charAt(0).toUpperCase()}${searchParams.get("sector").slice(1)} Schemes`
    : "All Schemes";
    console.log(categoryTitle)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className=" p-8 rounded-xl mb-8">
        <Banner/>
        <SchemeSearchBar allSchemes={mockSchemes} />
      </div>

      <h2 className="text-2xl font-bold mb-4">{categoryTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme, idx) => (
          <SchemeCard key={idx} scheme={scheme} />
        ))}
      </div>
    </div>
  );
};

export default Schemes;
