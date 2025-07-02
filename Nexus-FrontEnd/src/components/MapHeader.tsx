import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Make sure heroicons is installed
import Search from './Search';

interface MapHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showMap: boolean;
  setShowMap: (show: boolean) => void;
  handleSearch: (siteId: string) => void;
}

const categoryOptions = [
  'museum',
  'gallery',
  'hotel',
  'restaurant',
  'park',
  'bench',
  'theatre',
];

function MapHeader({
  selectedCategory,
  setSelectedCategory,
  showMap,
  setShowMap,
  handleSearch,
}: MapHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 relative">
      <Search handleSearch={handleSearch} />

      {/* Custom Dropdown */}
      <div className="relative w-full md:w-1/4">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full px-4 py-2 border rounded bg-white text-left flex justify-between items-center"
        >
          <span>
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </span>
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        </button>

        {dropdownOpen && (
          <ul className="absolute z-[500000] w-full bg-white border rounded shadow-md mt-1 max-h-60 overflow-y-auto transition-all duration-200 ease-in-out">
            {categoryOptions.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <li
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    isSelected ? 'bg-blue-50 font-semibold text-blue-700' : ''
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <button
        onClick={() => setShowMap(!showMap)}
        className="w-full md:w-auto px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showMap ? 'Show List View' : 'Show Map View'}
      </button>
    </div>
  );
}

export default MapHeader;
