import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, ArrowRight } from "lucide-react";

// List of sectors moved outside component for better readability
const SECTORS = [
  "Hardware",
  "IoT",
  "Robotics",
  "Internet",
  "Media",
  "E-commerce",
  "Software",
  "Healthtech",
  "Real Estate",
  "Security",
  "Medtech",
  "Wellness",
  "Foodtech",
  "Agtech",
  "Sustainability",
  "Tech",
  "Social Impact",
  "Various sectors",
  "Journalism",
  "Content",
  "Marketplaces",
  "Platforms",
  "Branding",
  "Marketing",
  "Design",
  "Urban Tech",
  "Smart Cities",
  "Mobility",
  "Retail",
  "Consumer Goods",
  "AI",
  "Machine Learning",
  "Fintech",
  "Banking",
  "Finance",
  "Insurance",
  "Insurtech",
  "Edtech",
  "Education",
  "Technology",
  "Deep Tech",
  "Biotech",
  "Female Entrepreneurs",
  "ML"
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  
  // Handle input changes and filter sectors
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() === "") {
      setFiltered([]);
    } else {
      // Filter sectors that start with the query (case-insensitive)
      const matchingSectors = SECTORS.filter((sector) =>
        sector.toLowerCase().startsWith(value.toLowerCase())
      );
      
      // Show only first 8 results to avoid overwhelming the UI
      setFiltered(matchingSectors.slice(0, 8));
    }
  };

  // Handle selection from dropdown
  const handleSelect = (value) => {
    const params = new URLSearchParams();
    params.append("sector", value.toLowerCase());
    setQuery("");
    setFiltered([]);
    navigate(`/schemes?${params.toString()}`);
  };

  // Handle search button click
  const handleSearch = () => {
    if (query.trim() !== "") {
      const params = new URLSearchParams();
      params.append("sector", query.trim().toLowerCase());
      navigate(`/schemes?${params.toString()}`);
      setQuery("");
      setFiltered([]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFiltered([]);
        setIsFocused(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className={cn(
        "flex flex-col md:flex-row items-stretch",
        "transition-all duration-200",
        isFocused ? "ring-2 ring-emerald-400 rounded-lg" : ""
      )}>
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder="e.g. Female Entrepreneurs"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className={cn(
              "pr-10 border-emerald-200",
              "focus:ring-0 focus:border-emerald-400",
              "md:rounded-r-none",
              "w-full h-12"
            )}
          />
          {query.length === 0 && (
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          )}
        </div>
        <Button
          onClick={handleSearch}
          className={cn(
            "mt-2 md:mt-0",
            "md:rounded-l-none",
            "bg-emerald-500 hover:bg-emerald-600",
            "h-12 px-6",
            "flex items-center gap-2 group"
          )}
        >
          <span>Search</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      {filtered.length > 0 && (
        <ul className={cn(
          "absolute z-10 w-full mt-1",
          "bg-white border border-gray-200 rounded-lg",
          "shadow-lg overflow-hidden",
          "max-h-64 overflow-y-auto"
        )}>
          {filtered.map((sector) => (
            <li
              key={sector}
              onClick={() => handleSelect(sector)}
              className={cn(
                "cursor-pointer px-4 py-3",
                "hover:bg-emerald-50 active:bg-emerald-100",
                "text-gray-800 transition-colors",
                "flex items-center justify-between"
              )}
            >
              <span>{sector}</span>
              <ArrowRight className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100" />
            </li>
          ))}
        </ul>
      )}
      
      {query.length > 0 && filtered.length === 0 && (
        <div className={cn(
          "absolute z-10 w-full mt-1",
          "bg-white border border-gray-200 rounded-lg",
          "shadow-lg p-4 text-center text-gray-500"
        )}>
          No matching sectors found
        </div>
      )}
    </div>
  );
}