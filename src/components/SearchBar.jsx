import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  "business",
  "education",
  "agriculture",
  "technology",
  "healthcare",
  "women",
  "startup",
  "student",
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
        categories.filter((cat) =>
          cat.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    }
  };

  const handleSelect = (value) => {
    setQuery("");
    setFiltered([]);
    navigate(`/schemes/${value}`);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/schemes/${query.trim().toLowerCase()}`);
      setQuery("");
      setFiltered([]);
    }
  };

  // 🔁 Detect outside click
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
      <div className="flex">
        <Input
          type="text"
          placeholder="e.g. business, education, agriculture"
          value={query}
          onChange={handleChange}
          className="rounded-r-none"
        />
        <Button
          onClick={handleSearch}
          className="rounded-l-none bg-emerald-500 hover:bg-emerald-600"
        >
          Search
        </Button>
      </div>

      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow">
          {filtered.map((cat) => (
            <li
              key={cat}
              onClick={() => handleSelect(cat)}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-emerald-100 text-gray-800"
              )}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
