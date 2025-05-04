import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SchemeCard from "./SchemeCard";
import Papa from "papaparse";

const uniqueGrantOptions = [
  "Up to $20,000", "Up to $50,000", "Up to $80,000", "Up to $100,000", "Up to $120,000",
  "Up to $150,000", "Up to $250,000", "Up to $380,000", "Up to $500,000", "Varies"
];

const Schemes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectorFilter, setSectorFilter] = useState("");
  const [grantFilter, setGrantFilter] = useState("");

  function formatFundingData(data) {
    return {
      title: data["Program"],
      organization: data["Organization"],
      focusAreas: data["Focus_Area"]
        ? data["Focus_Area"].replace(/^\s*"(.*)"\s*$/, "$1").trim().split(",").map((f) => f.trim())
        : [],
      support: data["Grant/Support"],
      deadline: data["Deadline"],
      applyLink: data["Link"],
    };
  }

  useEffect(() => {
    const fetchSchemes = async () => {
      const csvUrl =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1kiCFeQNcNGhn3MMlsKdg8EhDi4Qbamuy2NKPentn37a3L85gvJkABfAnlPYi-8IdVuEg7Pbi58-F/pub?output=csv";
      try {
        const res = await fetch(csvUrl);
        const text = await res.text();

        const parsed = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });

        const sector = searchParams.get("sector")?.toLowerCase();
        // console.log(sector)
        const grant = searchParams.get("grant")?.toLowerCase();

        const formatted = parsed.data.map(formatFundingData);

        let filtered = formatted;

        if (sector) {
         const regex = new RegExp(`\\b${sector}`, "i");

            filtered = filtered.filter((scheme) =>
                scheme.focusAreas.some((area) => regex.test(area))
            );

        }
        console.log(filtered)
        if (grant && grant !== "all") {
          filtered = filtered.filter((scheme) =>
            scheme.support?.toLowerCase().includes(grant)
          );
        }

        setFilteredSchemes(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch or parse CSV data:", error);
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const categoryTitle = searchParams.get("sector")
    ? `${searchParams.get("sector").charAt(0).toUpperCase()}${searchParams.get("sector").slice(1)} Schemes`
    : "All Schemes";

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-sm font-medium">Filter by Sector</label>
          <input
            type="text"
            placeholder="Enter sector keyword"
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value);
              handleFilterChange("sector", e.target.value);
            }}
            className="border rounded px-3 py-2 w-full md:w-64"
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-sm font-medium">Filter by Grant</label>
          <select
            value={grantFilter}
            onChange={(e) => {
              setGrantFilter(e.target.value);
              handleFilterChange("grant", e.target.value);
            }}
            className="border rounded px-3 py-2 w-full md:w-64"
          >
            <option value="">All</option>
            {uniqueGrantOptions.map((option, i) => (
              <option key={i} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 text-lg font-medium mt-8 animate-pulse">
          🔄 Fetching latest schemes for you...
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-semibold mb-6">{categoryTitle}</h2>
          {filteredSchemes.length === 0 ? (
            <div className="text-center text-gray-600 text-lg font-medium mt-8">
              ❌ No {categoryTitle} schemes found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme, idx) => (
                <SchemeCard key={idx} scheme={scheme} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Schemes;
