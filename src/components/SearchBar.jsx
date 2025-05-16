import { useEffect, useRef, useState, useCallback, memo, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "@/hooks/useDebounce";
import Papa from "papaparse";

// Constants
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1kiCFeQNcNGhn3MMlsKdg8EhDi4Qbamuy2NKPentn37a3L85gvJkABfAnlPYi-8IdVuEg7Pbi58-F/pub?output=csv";

// Memoized dropdown item to prevent unnecessary re-renders
const DropdownItem = memo(({ category, onSelect }) => (
  <motion.li
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    transition={{ duration: 0.15 }}
    onClick={() => onSelect(category)}
    className={cn(
      "cursor-pointer px-4 py-3",
      "hover:bg-emerald-50 active:bg-emerald-100",
      "text-gray-800 transition-colors",
      "flex items-center justify-between group"
    )}
  >
    <span>{category}</span>
    <ArrowRight className="h-4 w-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.li>
  
));

// Optimized search bar component with accessibility improvements
const SearchBar = ({ placeholder = "e.g. Female Entrepreneurs", initialValue = "" }) => {
  const [query, setQuery] = useState(initialValue);
  const [filtered, setFiltered] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const debouncedQuery = useDebounce(query, 300);
  const [loading, setLoading] = useState(true);  // New loading state
  const [error, setError] = useState(null);      // New error state
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
 
  const hasFilteredResults = filtered.length > 0;

  // Handle input change
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    // Filter logic can be added here if needed
  }, []);

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);   
      try {
        const res = await fetch(CSV_URL);
        const text = await res.text();
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        const categories = [...new Set(parsed.data.flatMap((item) => item["Focus_Area"].split(",").map((cat) => cat.trim())))];
        setUniqueCategories(categories);
        setError(null); 
        // console.log(categories)
      } catch (err) {
        setError("Error loading categories. Please try again later.");
      } finally {
        setLoading(false);  // Stop loading
      }
    };
    fetchSchemes();
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      const filteredCategories = uniqueCategories.filter((cat) =>
        new RegExp(`^${debouncedQuery.toLowerCase()}`).test(cat.toLowerCase())

      );
      setFiltered(filteredCategories);
    } else {
      
      setFiltered([]);
    }
  }, [debouncedQuery, uniqueCategories]);

  // Handle selection from dropdown
  const handleSelect = useCallback((value) => {
    const params = new URLSearchParams();
    params.append("sector", value.toLowerCase());
    navigate(`/schemes?${params.toString()}`);
    setQuery("");
    setFiltered([]);
  }, [navigate]);

  // Handle search button click
  const handleSearch = useCallback(() => {
    if (query.trim() !== "") {
      const params = new URLSearchParams();
      params.append("sector", query.trim().toLowerCase());
      navigate(`/schemes?${params.toString()}`);
      setQuery("");
      setFiltered([]);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [query, navigate]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (filtered.length === 0) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(filtered[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        e.preventDefault();
        setFiltered([]);
        setIsFocused(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  }, [filtered, selectedIndex, handleSelect, handleSearch]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFiltered([]);
        setIsFocused(false);
      }
    };
    
    if (!document.__searchBarClickListener) {
      document.addEventListener("mousedown", handleClickOutside);
      document.__searchBarClickListener = true;
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.__searchBarClickListener = false;
    };
  }, []);
  return (
    <div 
      ref={wrapperRef} 
      className="relative w-full max-w-md" 
      role="search" 
      aria-label="Sector search"
    >
      <div className={cn(
        "flex flex-col md:flex-row items-stretch",
        "transition-all duration-200",
        isFocused ? "ring-2 ring-emerald-400 rounded-lg" : ""
      )}>
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            aria-expanded={filtered.length > 0}
            aria-autocomplete="list"
            aria-controls={filtered.length > 0 ? "search-results-list" : undefined}
            aria-activedescendant={selectedIndex >= 0 ? `search-item-${selectedIndex}` : undefined}
            className={cn(
              "pr-10 border-emerald-200",
              "focus:ring-0 focus:border-emerald-400",
              "md:rounded-r-none",
              "w-full h-12"
            )}
          />
          {query.length === 0 && (
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
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
          aria-label="Search for sector"
        >
          <span>Search</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Button>
      </div>
      
      <AnimatePresence>
        {hasFilteredResults && (
          <motion.ul
            ref={listRef}
            id="search-results-list"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-10 w-full mt-1",
              "bg-white border border-gray-200 rounded-lg",
              "shadow-lg",
              "max-h-64 overflow-y-auto"
            )}
            role="listbox"
          >
             {filtered.map((category, index) => (
              <DropdownItem key={index} category={category} onSelect={handleSelect} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {query.length > 0 && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-10 w-full mt-1",
              "bg-white border border-gray-200 rounded-lg",
              "shadow-lg p-4 text-center text-gray-500"
            )}
            role="status"
          >
            No matching sectors found
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  
  );
};

export default memo(SearchBar);