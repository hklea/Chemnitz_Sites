import React, { useEffect, useState } from 'react';
import MapDisplay from '../components/MapDisplay';

const MapPage: React.FC = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cultural-sites')
      .then((res) => res.json())
      .then((data) => setSites(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Explore Cultural Sites in Chemnitz</h1>
      <MapDisplay sites={sites} />
    </div>
  );
};

export default MapPage;
