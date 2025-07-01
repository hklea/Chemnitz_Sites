import Search from './Search'
import React from 'react'

interface MapHeaderProps{
    selectedCategory: string;
    setSelectedCategory: (category: string) =>void
    showMap : boolean;
    setShowMap: (show: boolean) =>void
    handleSearch: (siteId:string)=> void
}

const categoryOptions = [
  "museum",
  "gallery",
  "hotel",
  "restaurant",
  "park",
  "bench",
  "theatre",
]; 

function MapHeader({selectedCategory, setSelectedCategory, showMap,setShowMap,handleSearch}: MapHeaderProps) {
  return (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
     <Search handleSearch={handleSearch} />

      <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded"
        >
          {categoryOptions.map((cat, index) => (
            <option key={index} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

       

        <button
          onClick={() => setShowMap(!showMap)}
          className="w-full md:w-auto px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showMap ? "Show List View" : "Show Map View"}
        </button>
      </div>

  )
}

export default MapHeader
