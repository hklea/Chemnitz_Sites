import React, { useEffect, useState } from "react";
import MapDisplay from "./MapDisplay";
import { getSitesByCategory } from "../API/api";
import { Site } from "../types/culturalSiteType";
import MapHeader from "./MapHeader";
import { getFeatureById } from "../API/api";

const CulturalSiteList: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [filteredSites, setFilteredSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("museum"); // Default to museum

  // Fetch data by selected category
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cleanedSites = await getSitesByCategory(selectedCategory);
        setSites(cleanedSites);
        setFilteredSites(cleanedSites);
      } catch (err) {
        console.error("Failed to fetch sites by category:", err);
        setSites([]);
        setFilteredSites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleSearch = async (siteId: string) => {
    const site = await getFeatureById(siteId);
    console.log("here", site)
    setSites(site? [site]: [])
    setFilteredSites(site? [site]: [])
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Sites in Chemnitz
      </h1>

      <MapHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showMap={showMap}
        setShowMap={setShowMap}
        handleSearch={handleSearch}
      />

      {/* Content View */}
      {loading ? (
        <p className="text-center text-gray-600">
          Loading {selectedCategory} sites...
        </p>
      ) : showMap ? (
        <MapDisplay sites={filteredSites} />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSites.map((site, index) => (
            <li
              key={index}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{site.properties.name}</h2>
              <p className="text-gray-600">{site.properties.category}</p>
              {site.properties.address && (
                <p className="text-sm text-gray-500">
                  {site.properties.address}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CulturalSiteList;
