// File: components/SchemeSearchBar.jsx
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const sectors = [
  "business",
  "education",
  "agriculture",
  "technology",
  "healthcare",
  "women",
  "startup",
  "student",
  "ai", // if you're supporting this as a category
];

export default function SchemeSearchBar({ allSchemes = [] }) {
  const [query, setQuery] = useState("");
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const wrapperRef = useRef(null);

  // Detect category from the URL if it's like /schemes/:category
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts[1] === "schemes" && pathParts[2] && !location.search) {
      const maybeSector = pathParts[2].toLowerCase();
      if (sectors.includes(maybeSector)) {
        setSelectedSector(maybeSector);
      }
    }
  }, [location.pathname, location.search]);

  const handleSchemeChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setFilteredSchemes([]);
    } else {
      setFilteredSchemes(
        allSchemes.filter((scheme) =>
          scheme.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleSelectScheme = (value) => {
    setQuery(value);
    setFilteredSchemes([]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.append("name", query.trim());
    if (selectedSector) params.append("sector", selectedSector);
    navigate(`/schemes?${params.toString()}`);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFilteredSchemes([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
    >
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search by scheme name..."
          value={query}
          onChange={handleSchemeChange}
        />
        {filteredSchemes.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow">
            {filteredSchemes.map((scheme, index) => (
              <li
                key={index}
                onClick={() => handleSelectScheme(scheme.name)}
                className={cn("cursor-pointer px-4 py-2 hover:bg-emerald-100")}
              >
                {scheme.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Select value={selectedSector} onValueChange={setSelectedSector}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select sector" />
        </SelectTrigger>
        <SelectContent>
          {sectors.map((sector, idx) => (
            <SelectItem key={idx} value={sector}>
              {sector.charAt(0).toUpperCase() + sector.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
