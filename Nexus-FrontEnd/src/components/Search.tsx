import React, { useState, useEffect } from "react";
import { searchSitesByName } from "../API/api";

function Search({handleSearch}:{ handleSearch: (siteId:string)=> void}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: string; name: string }[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    // Debounce the API call
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = window.setTimeout(async () => {
      try {
        const results = await searchSitesByName(query.trim());
        setSuggestions(results);
      } catch (err) {
        console.error("Search error:", err);
        setSuggestions([]);
      }
    }, 300); // 300ms debounce

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative max-w-sm99">
      <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 18 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search site name..."
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => e.preventDefault()}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      {/* 🔽 Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-[1000000] w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md dark:bg-gray-800 dark:border-gray-700 max-h-60 overflow-y-auto">
          {suggestions.map((site) => (
            <li
              key={site.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setQuery(site.name);
                setSuggestions([]);
                handleSearch(site.id)
              }}
            >
              {site.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
