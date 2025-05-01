import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SchemeCard from "./SchemeCard";
import SchemeSearchBar from "./SchemeSearchBar";
import schemeData from "../../data/Scheme"; // Make sure this is a .json or .js export

const Schemes = () => {
  const [searchParams] = useSearchParams();
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  useEffect(() => {
    const sector = searchParams.get("sector")?.toLowerCase();
    const grantParam = parseInt(searchParams.get("grant") || "0");

    let filtered = schemeData.filter((s) => s);

    if (sector) {
      filtered = filtered.filter((s) =>
        s["Focus Area"]?.toLowerCase().includes(sector)
      );
    }

    if (grantParam) {
      filtered = filtered.filter((s) => parseInt(s["Grant/Support"] || 0) >= grantParam);
    }

    setFilteredSchemes(filtered);
  }, [searchParams]);

  const categoryTitle = searchParams.get("sector")
    ? `${searchParams.get("sector").charAt(0).toUpperCase()}${searchParams
        .get("sector")
        .slice(1)} Schemes`
    : "All Schemes";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="p-8 rounded-xl mb-8">
        <SchemeSearchBar allSchemes={schemeData} />
      </div>

      <h2 className="text-2xl font-bold mb-4">{categoryTitle}</h2>

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
    </div>
  );
};

export default Schemes;
