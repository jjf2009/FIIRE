// File: components/SchemeSearchBar.jsx
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  "ai",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFiltered([]);
    } else {
      setFiltered(
        sectors.filter((sector) =>
          sector.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    }
  };

  const handleSelect = (value) => {
    const params = new URLSearchParams();
    params.append("sector", value.toLowerCase());
    setQuery("");
    setFiltered([]);
    navigate(`/schemes?${params.toString()}`);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim() !== "") {
      params.append("sector", query.trim().toLowerCase());
      navigate(`/schemes?${params.toString()}`);
      setQuery("");
      setFiltered([]);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setQuery("");
        setFiltered([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="flex flex-col md:flex-row items-center">
        <Input
          type="text"
          placeholder="e.g. business, education, agriculture"
          value={query}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="md:rounded-r-none w-auto md:w-full"
        />
        <Button
          onClick={handleSearch}
          className="rounded-l-none bg-emerald-500 hover:bg-emerald-600 w-50 md:w-25 "
        >
          Search
        </Button>
      </div>

      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow">
          {filtered.map((sector) => (
            <li
              key={sector}
              onClick={() => handleSelect(sector)}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-emerald-100 text-gray-800"
              )}
            >
              {sector}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
