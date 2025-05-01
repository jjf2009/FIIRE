import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SchemeCard from "./SchemeCard";
import schemeData from "../../data/Scheme"; // Should be an array

const Schemes = () => {
  const [searchParams] = useSearchParams();
  const [filteredSchemes, setFilteredSchemes] = useState([]);

  function formatFundingData(data) {
    return {
      title: data.Program || data.Organization,
      organization: data.Organization,
      focusAreas: data["Focus Area"].split(",").map((f) => f.trim()),
      support: data["Grant/Support"],
      deadline: data.Deadline,
      applyLink: data.Link,
    };
  }

  useEffect(() => {
    const sector = searchParams.get("sector")?.toLowerCase();

    // Format all schemes
    const formatted = schemeData.map(formatFundingData);

    let filtered = formatted;

    if (sector) {
      filtered = formatted.filter((scheme) =>
        scheme.focusAreas.some((area) =>
          area.toLowerCase().includes(sector)
        )
      );
    }

    setFilteredSchemes(filtered);
  }, [searchParams]);

  const categoryTitle = searchParams.get("sector")
    ? `${searchParams.get("sector").charAt(0).toUpperCase()}${searchParams
        .get("sector")
        .slice(1)} Schemes`
    : "All Schemes";

  return (
    <div className="container mx-auto py-10 px-4">
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
    </div>
  );
};

export default Schemes;
