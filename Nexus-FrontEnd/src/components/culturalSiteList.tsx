// // // import React, { useEffect, useState } from "react";
// // // import { getAllSites } from "../API/api";

// // // type SiteFeature = {
// // //   type: string;
// // //   geometry: {
// // //     type: string;
// // //     coordinates: number[];
// // //   };
// // //   properties: {
// // //     name?: string;
// // //     tourism?: string;
// // //     amenity?: string;
// // //     [key: string]: any; // To handle any other unexpected props
// // //   };
// // // };

// // // const CulturalSiteList: React.FC = () => {
// // //   const [sites, setSites] = useState<SiteFeature[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);

// // //   useEffect(() => {
// // //     getAllSites()
// // //       .then((response) => {
// // //         console.log("Raw API data:", response.data);

// // //         // Flatten all features from all collections
// // //         const allFeatures: SiteFeature[] = response.data.flatMap(
// // //           (collection: { features: SiteFeature[] }) => collection.features
// // //         );

// // //         setSites(allFeatures);
// // //         setLoading(false);
// // //       })
// // //       .catch((err: any) => {
// // //         console.error(err);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h1>Cultural Sites in Chemnitz</h1>
// // //       {loading ? (
// // //         <p>Loading cultural sites...</p>
// // //       ) : (
// // //         <ul>
// // //           {sites.map((site, index) => (
// // //             <li key={index}>
// // //               {site.properties.name ?? "Unnamed"} -{" "}
// // //               {site.properties.tourism ||
// // //                 site.properties.amenity ||
// // //                 "Unknown category"}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CulturalSiteList;

// // // // import React, { useEffect, useState } from "react";
// // // // import { getAllSites } from "../API/api";

// // // // const culturalSiteList = () => {
// // // //   const [sites, setSites] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     getAllSites()
// // // //       .then((response) => {
// // // //         console.log("Raw API data:", response.data);

// // // //         // Flatten all features from all collections
// // // //         const allFeatures = response.data.flatMap(
// // // //           (collection) => collection.features
// // // //         );

// // // //         setSites(allFeatures);
// // // //         setLoading(false);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error(err);
// // // //         setLoading(false);
// // // //       });
// // // //   }, []);
// // // //   return (
// // // //     <div>
// // // //       <h1>Cultural Sites in Chemnitz</h1>
// // // //       {loading ? (
// // // //         <p>Loading cultural sites...</p>
// // // //       ) : (
// // // //         <ul>
// // // //           {sites.map((site, index) => (
// // // //             <li key={index}>
// // // //               {site.properties.name} -{" "}
// // // //               {site.properties.tourism ||
// // // //                 site.properties.amenity ||
// // // //                 "Unknown category"}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default culturalSiteList;

// // // // // shiko se kte e more nga front
// // import React, { useEffect, useState } from "react";
// // import { getAllSites } from "../API/api";
// // import MapDisplay from "./MapDisplay"; // Adjust path if needed

// // type SiteFeature = {
// //   type: string;
// //   geometry: {
// //     type: string;
// //     coordinates: number[]; // [longitude, latitude]
// //   };
// //   properties: {
// //     name?: string;
// //     tourism?: string;
// //     amenity?: string;
// //     [key: string]: any;
// //   };
// // };

// // interface Site {
// //   name: string;
// //   category: string;
// //   latitude: number;
// //   longitude: number;
// // }

// // const CulturalSiteList: React.FC = () => {
// //   const [sites, setSites] = useState<Site[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);

// //   useEffect(() => {
// //     getAllSites()
// //       .then((response) => {
// //         const allFeatures: SiteFeature[] = response.data.flatMap(
// //           (collection: { features: SiteFeature[] }) => collection.features
// //         );

// //         // Transform to proper map data structure
// //         const transformedSites: Site[] = allFeatures
// //           .filter(
// //             (feature) =>
// //               feature.geometry?.coordinates?.length === 2 &&
// //               (feature.properties?.name || feature.properties?.amenity || feature.properties?.tourism)
// //           )
// //           .map((feature) => ({
// //             name: feature.properties.name || "Unnamed Site",
// //             category: feature.properties.tourism || feature.properties.amenity || "Unknown",
// //             latitude: feature.geometry.coordinates[1], // GeoJSON: [lon, lat]
// //             longitude: feature.geometry.coordinates[0],
// //           }));

// //         setSites(transformedSites);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   return (
// //     <div className="px-6 py-8">
// //       <h1 className="text-3xl font-bold mb-4">Cultural Sites in Chemnitz</h1>

// //       {loading ? (
// //         <p>Loading cultural sites...</p>
// //       ) : (
// //         <>
// //           <MapDisplay sites={sites} />

// //           <ul className="mt-6 space-y-2">
// //             {sites.map((site, index) => (
// //               <li key={index} className="text-lg">
// //                 {site.name} – {site.category}
// //               </li>
// //             ))}
// //           </ul>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default CulturalSiteList;
// import React, { useEffect, useState } from "react";
// import { getAllSites } from "../API/api";
// import MapDisplay from "./MapDisplay"; // make sure this is the correct path

// type Site = {
//   name: string;
//   category: string;
//   latitude: number;
//   longitude: number;
// };

// type SiteFeature = {
//   type: string;
//   geometry: {
//     type: string;
//     coordinates: number[];
//   };
//   properties: {
//     name?: string;
//     tourism?: string;
//     amenity?: string;
//     [key: string]: any;
//   };
// };

// const CulturalSiteList: React.FC = () => {
//   const [sites, setSites] = useState<Site[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showMap, setShowMap] = useState<boolean>(true); // <--- NEW STATE

//   useEffect(() => {
//     getAllSites()
//       .then((response) => {
//         const allFeatures: SiteFeature[] = response.data.flatMap(
//           (collection: { features: SiteFeature[] }) => collection.features
//         );

//         const cleanedSites: Site[] = allFeatures.map((feature) => ({
//           name: feature.properties.name ?? "Unnamed",
//           category:
//             feature.properties.tourism ||
//             feature.properties.amenity ||
//             "Unknown category",
//           latitude: feature.geometry.coordinates[1],
//           longitude: feature.geometry.coordinates[0],
//         }));

//         setSites(cleanedSites);
//         setLoading(false);
//       })
//       .catch((err: any) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Cultural Sites in Chemnitz</h1>

//       <button
//         onClick={() => setShowMap(!showMap)}
//         className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {showMap ? "Show List View" : "Show Map View"}
//       </button>

//       {loading ? (
//         <p>Loading cultural sites...</p>
//       ) : showMap ? (
//         <MapDisplay sites={sites} />
//       ) : (
//         <ul className="space-y-2">
//           {sites.map((site, index) => (
//             <li key={index}>
//               {site.name} – {site.category}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CulturalSiteList;
import React, { useEffect, useState } from "react";
import { getAllSites } from "../API/api";
import MapDisplay from "./MapDisplay";

type Site = {
  _id:string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  website?:string;
  address?:string;

};

type SiteFeature = {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    name?: string;
    tourism?: string;
    amenity?: string;
    [key: string]: any;
  };
};

const CulturalSiteList: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [filteredSites, setFilteredSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    getAllSites()
      .then((response) => {
        const allFeatures: SiteFeature[] = response.data.flatMap(
          (collection: { features: SiteFeature[] }) => collection.features
        );

        const cleanedSites: Site[] = allFeatures.map((feature,index) => ({
          _id:  String(index),
          name: feature.properties.name ?? "Unnamed",
          category:
            feature.properties.tourism ||
            feature.properties.amenity ||
            "Unknown category",
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
          website: feature.properties.website ?? undefined,
        }));

        setSites(cleanedSites);
        setFilteredSites(cleanedSites);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = sites.filter((site) => {
      const matchesSearch = site.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || site.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredSites(filtered);
  }, [searchTerm, selectedCategory, sites]);

  const uniqueCategories = Array.from(new Set(sites.map((s) => s.category)));

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Explore Sites of Chemnitz
      </h1>

      {/* Search + Filter + Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
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

      {/* Content View */}
      {loading ? (
        <p className="text-center text-gray-600">Loading cultural sites...</p>
      ) : showMap ? (
        <MapDisplay sites={filteredSites} />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredSites.map((site, index) => (
            <li
              key={index}
              className="border rounded p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{site.name}</h2>
              <p className="text-gray-600">{site.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CulturalSiteList;