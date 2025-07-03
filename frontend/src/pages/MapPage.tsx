import React, { useEffect, useState } from 'react';
import MapDisplay from '../components/MapDisplay';
import { getSitesByCategory } from '../API/api';
import { Site } from '../types/culturalSiteType';

const MapPage: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]); // ✅ typed state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("prove2: ");
    const fetchSites = async () => {
      try {
        const category = "restaurant"; // ✅ or make this dynamic later
        const data = await getSitesByCategory(category);
        setSites(data);
      } catch (error) {
        console.error("Failed to fetch sites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Cultural Sites in Chemnitz</h1>
      {loading ? (
        <p>Loading map data...</p>
      ) : (
        <MapDisplay sites={sites} />
      )}
    </div>
  );
};

export default MapPage;
