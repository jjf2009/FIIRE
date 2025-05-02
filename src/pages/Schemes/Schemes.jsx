import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SchemeCard from "./SchemeCard";
import SearchBar from "@/components/SearchBar";

const Schemes = () => {
  const [searchParams] = useSearchParams();
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      // const sheetURL = 'https://script.google.com/macros/s/AKfycbyuXbixSl4nOE_QAOOyKGZ0oJt3ghptZtcdMz8xyo2U5pytwNNU45fWrT5BCp7CJbN-ZA/exec';
      try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbyuXbixSl4nOE_QAOOyKGZ0oJt3ghptZtcdMz8xyo2U5pytwNNU45fWrT5BCp7CJbN-ZA/exec");
        const data = await res.json(); // ✅ Now it works
        console.log("Data",data)

        const sector = searchParams.get("sector")?.toLowerCase();
        let filtered = data.schemes;
        console.log(filtered)

        if (sector) {
          filtered = filtered.filter((scheme) =>
            scheme.focusAreas.some((area) =>
              area.toLowerCase().includes(sector)
            )
          );
        }
      
        setFilteredSchemes(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch schemes:", error);
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [searchParams]);

  const categoryTitle = searchParams.get("sector")
    ? `${searchParams.get("sector").charAt(0).toUpperCase()}${searchParams
        .get("sector")
        .slice(1)} Schemes`
    : "All Schemes";

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold mb-6">{categoryTitle}</h2>
      <span className="md:hidden m-3">
        <SearchBar />
      </span>

      {loading ? (
        <div className="text-center text-gray-500 font-medium mt-8">Loading...</div>
      ) : filteredSchemes.length === 0 ? (
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
