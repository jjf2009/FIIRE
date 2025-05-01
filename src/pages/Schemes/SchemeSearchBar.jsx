import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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

export default function SchemeSearchBar() {
  const [sectorQuery, setSectorQuery] = useState("");
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [grant, setGrant] = useState([0]);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const handleSectorChange = (e) => {
    const value = e.target.value;
    setSectorQuery(value);
    if (value.trim() === "") {
      setFilteredSectors([]);
    } else {
      setFilteredSectors(
        sectors.filter((s) =>
          s.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    }
  };

  const handleSelectSector = (sector) => {
    setSectorQuery(sector);
    setFilteredSectors([]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (sectorQuery.trim()) {
      params.append("sector", sectorQuery.trim().toLowerCase());
    }
    if (grant[0] > 0) {
      params.append("grant", grant[0]);
    }
    navigate(`/schemes?${params.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setFilteredSectors([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-4"
    >
      {/* Sector Input with suggestions */}
      <div className="relative w-full md:max-w-xs">
        <Input
          type="text"
          placeholder="Enter sector"
          value={sectorQuery}
          onChange={handleSectorChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {filteredSectors.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow">
            {filteredSectors.map((sector) => (
              <li
                key={sector}
                onClick={() => handleSelectSector(sector)}
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

      {/* Grant Slider */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-3 w-full md:w-fit">
        <label className="text-sm text-gray-700 whitespace-nowrap">
          Max ₹{grant[0].toLocaleString()}
        </label>
        <div className="w-full md:w-64">
          <Slider
            value={grant}
            min={1000}
            max={1000000}
            step={1000}
            onValueChange={(value) => setGrant(value)}
          />
        </div>
      </div>

      {/* Search Button */}
          {/* Search and Reset Buttons */}
          <div className="flex gap-2 w-full md:w-auto">
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600"
        >
          Search
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSectorQuery("");
            setGrant([1000]);
            navigate("/schemes");
          }}
          className="w-full md:w-auto"
        >
          Reset
        </Button>
      </div>

    </div>
  );
}
