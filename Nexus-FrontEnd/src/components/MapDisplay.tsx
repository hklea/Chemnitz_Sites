// // // export default MapDisplay;
// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import { LatLngExpression } from "leaflet";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import React, { useState } from "react";

// // interface Site {
// //   _id: string;
// //   name: string;
// //   category: string;
// //   latitude: number;
// //   longitude: number;
// //   website?: string;
// //   address?: string;
// // }

// // interface MapDisplayProps {
// //   sites: Site[];
// // }

// // const MapDisplay: React.FC<MapDisplayProps> = ({ sites }) => {
// //   const center: LatLngExpression = [50.83, 12.92];
// //   const navigate = useNavigate();
// //   const [loadingId, setLoadingId] = useState<string | null>(null);

// //   const capitalize = (text: string) =>
// //     text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

// //   const handleFavorite = async (siteId: string) => {
// //     const user = localStorage.getItem("user");
// //     const token = localStorage.getItem("token");

// //     if (!user || !token) {
// //       alert("Please log in to save favorites.");
// //       navigate("/auth");
// //       return;
// //     }

// //     const userId = JSON.parse(user)._id;

// //     try {
// //       setLoadingId(siteId);
// //       const res = await axios.post(
// //         `http://localhost:5000/api/users/${userId}/favorites`,
// //         { siteId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       console.log("✅ Added to favorites:", res.data);
// //       alert("Site added to favorites!");
// //     } catch (error: any) {
// //       console.error("❌ Error adding to favorites:", error);
// //       if (error.response) {
// //         alert(error.response.data.message || "Failed to add to favorites.");
// //       } else {
// //         alert("Network error. Try again.");
// //       }
// //     } finally {
// //       setLoadingId(null);
// //     }
// //   };

// //   return (
// //     <MapContainer
// //       center={center}
// //       zoom={13}
// //       style={{ height: "500px", width: "100%" }}
// //     >
// //       <TileLayer
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         attribution="&copy; OpenStreetMap contributors"
// //       />
// //       {sites.map((site) => (
// //         <Marker key={site._id} position={[site.latitude, site.longitude]}>
// //           <Popup>
// //             <div className="text-sm">
// //               <strong>{site.name}</strong>
// //               <br />
// //               Category: {capitalize(site.category)}
// //               <br />
// //               Website:{" "}
// //               {site.website ? (
// //                 <a
// //                   href={site.website}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-blue-600 underline"
// //                 >
// //                   {site.website}
// //                 </a>
// //               ) : (
// //                 "N/A"
// //               )}
// //               <br />
// //               Address: {site.address || "N/A"}
// //               <br />
// //               <button
// //                 onClick={() => handleFavorite(site._id)}
// //                 disabled={loadingId === site._id}
// //                 className={`mt-2 underline ${
// //                   loadingId === site._id
// //                     ? "text-gray-500 cursor-not-allowed"
// //                     : "text-blue-600 hover:text-blue-800"
// //                 }`}
// //               >
// //                 {loadingId === site._id ? "Adding..." : "Add to Favorites"}
// //               </button>
// //             </div>
// //           </Popup>
// //         </Marker>
// //       ))}
// //     </MapContainer>
// //   );
// // };

// // export default MapDisplay;











// // //kot
// // // import React, { useState, useEffect } from "react";
// // // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // // import "leaflet/dist/leaflet.css";
// // // import { LatLngExpression } from "leaflet";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // interface Site {
// // //   _id: string;
// // //   name: string;
// // //   category: string;
// // //   latitude: number;
// // //   longitude: number;
// // //   website?: string;
// // //   address?: string;
// // // }

// // // interface MapDisplayProps {
// // //   sites: Site[];
// // // }

// // // const MapDisplay: React.FC<MapDisplayProps> = ({ sites }) => {
// // //   const center: LatLngExpression = [50.83, 12.92];
// // //   const navigate = useNavigate();
// // //   const [loadingId, setLoadingId] = useState<string | null>(null);
// // //   const [favorites, setFavorites] = useState<Site[]>([]);
// // //   const [loadingFav, setLoadingFav] = useState(false);

// // //   const user = localStorage.getItem("user");
// // //   const token = localStorage.getItem("token");
// // //   const userId = user ? JSON.parse(user).id : null;

// // //   // Capitalize helper
// // //   const capitalize = (text: string) =>
// // //     text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

// // //   // Fetch favorites from backend
// // //   const fetchFavorites = async () => {
// // //     if (!userId || !token) return;
// // //     setLoadingFav(true);
// // //     try {
// // //       const res = await axios.get(
// // //         `http://localhost:5000/api/users/${userId}/favorites`,
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       setFavorites(res.data.favorites || []);
// // //     } catch (error) {
// // //       console.error("Failed to fetch favorites", error);
// // //     } finally {
// // //       setLoadingFav(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchFavorites();
// // //   }, []);

// // //   // Add a site to favorites
// // //   const handleFavorite = async (siteId: string) => {
// // //     if (!userId || !token) {
// // //       alert("Please log in to save favorites.");
// // //       navigate("/auth");
// // //       return;
// // //     }

// // //     try {
// // //       setLoadingId(siteId);
// // //       await axios.post(
// // //         `http://localhost:5000/api/users/${userId}/favorites`,
// // //         { siteId },
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       alert("Site added to favorites!");
// // //       // Refresh favorites list
// // //       fetchFavorites();
// // //     } catch (error: any) {
// // //       if (error.response) {
// // //         alert(error.response.data.message || "Failed to add to favorites.");
// // //       } else {
// // //         alert("Network error. Try again.");
// // //       }
// // //     } finally {
// // //       setLoadingId(null);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div className="mb-4">
// // //         <h2 className="text-lg font-semibold">Your Favorite Sites</h2>
// // //         {loadingFav ? (
// // //           <p>Loading favorites...</p>
// // //         ) : favorites.length === 0 ? (
// // //           <p>You have no favorite sites yet.</p>
// // //         ) : (
// // //           <ul className="list-disc ml-5">
// // //             {favorites.map((fav) => (
// // //               <li key={fav._id}>
// // //                 {fav.name} ({capitalize(fav.category)})
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}
// // //       </div>

// // //       <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
// // //         <TileLayer
// // //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //           attribution="&copy; OpenStreetMap contributors"
// // //         />
// // //         {sites.map((site) => (
// // //           <Marker key={site._id} position={[site.latitude, site.longitude]}>
// // //             <Popup>
// // //               <div className="text-sm">
// // //                 <strong>{site.name}</strong>
// // //                 <br />
// // //                 Category: {capitalize(site.category)}
// // //                 <br />
// // //                 Website:{" "}
// // //                 {site.website ? (
// // //                   <a
// // //                     href={site.website}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     className="text-blue-600 underline"
// // //                   >
// // //                     {site.website}
// // //                   </a>
// // //                 ) : (
// // //                   "N/A"
// // //                 )}
// // //                 <br />
// // //                 Address: {site.address || "N/A"}
// // //                 <br />
// // //                 <button
// // //                   onClick={() => handleFavorite(site._id)}
// // //                   disabled={loadingId === site._id}
// // //                   className={`mt-2 underline ${
// // //                     loadingId === site._id
// // //                       ? "text-gray-500 cursor-not-allowed"
// // //                       : "text-blue-600 hover:text-blue-800"
// // //                   }`}
// // //                 >
// // //                   {loadingId === site._id ? "Adding..." : "Add to Favorites"}
// // //                 </button>
// // //               </div>
// // //             </Popup>
// // //           </Marker>
// // //         ))}
// // //       </MapContainer>
// // //     </>
// // //   );
// // // };

// // // export default MapDisplay;
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { LatLngExpression } from "leaflet";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";

// interface Site {
//   _id: string;
//   name: string;
//   category: string;
//   latitude: number;
//   longitude: number;
//   website?: string;
//   address?: string;
// }

// interface MapDisplayProps {
//   sites: Site[];
//   onFavoriteAdded?: () => void; // 👈 new optional callback
// }

// const MapDisplay: React.FC<MapDisplayProps> = ({ sites, onFavoriteAdded }) => {
//   const center: LatLngExpression = [50.83, 12.92];
//   const navigate = useNavigate();
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   const capitalize = (text: string) =>
//     text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

//   const handleFavorite = async (siteId: string) => {
//     const userString = localStorage.getItem("user");
//     const token = localStorage.getItem("token");

//     if (!userString || !token) {
//       alert("Please log in to save favorites.");
//       navigate("/auth");
//       return;
//     }


//     let userId: string;
//     try {
//       const user = JSON.parse(userString);
//       userId = user.id;
//       if (!userId) throw new Error("Invalid user data.");
//     } catch {
//       alert("Corrupted user data. Please log in again.");
//       localStorage.clear();
//       navigate("/auth");
//       return;
//     }

//     try {
//       setLoadingId(siteId);
//       const res = await axios.post(
//         `http://localhost:5000/api/users/${userId}/favorites`,
//         { siteId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("✅ Added to favorites:", res.data);
//       onFavoriteAdded?.(); // 👈 update parent dashboard state
//     } catch (error: any) {
//       console.error("❌ Error adding to favorites:", error);
//       if (error.response?.status === 401) {
//         alert("Session expired. Please log in again.");
//         localStorage.clear();
//         navigate("/auth");
//       } else {
//         alert(
//           error.response?.data?.message || "Something went wrong. Try again."
//         );
//       }
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <MapContainer
//       center={center}
//       zoom={13}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />
//       {sites.map((site) => (
//         <Marker key={site._id} position={[site.latitude, site.longitude]}>
//           <Popup>
//             <div className="text-sm">
//               <strong>{site.name}</strong>
//               <br />
//               Category: {capitalize(site.category)}
//               <br />
//               Website:{" "}
//               {site.website ? (
//                 <a
//                   href={site.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {site.website}
//                 </a>
//               ) : (
//                 "N/A"
//               )}
//               <br />
//               Address: {site.address || "N/A"}
//               <br />
//               <button
//                 onClick={() => handleFavorite(site._id)}
//                 disabled={loadingId === site._id}
//                 className={`mt-2 underline ${
//                   loadingId === site._id
//                     ? "text-gray-500 cursor-not-allowed"
//                     : "text-blue-600 hover:text-blue-800"
//                 }`}
//               >
//                 {loadingId === site._id ? "Adding..." : "Add to Favorites"}
//               </button>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default MapDisplay;
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface Site {
  _id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  website?: string;
  address?: string;
}

interface MapDisplayProps {
  sites: Site[];
  onFavoriteAdded?: () => void; // optional callback when favorite is added
}

const MapDisplay: React.FC<MapDisplayProps> = ({ sites, onFavoriteAdded }) => {
  const center: LatLngExpression = [50.83, 12.92];
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const capitalize = (text: string) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const handleFavorite = async (siteId: string) => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!userString || !token) {
      alert("Please log in to save favorites.");
      navigate("/auth");
      return;
    }

    let userId: string;
    try {
      const user = JSON.parse(userString);
      userId = user.id || user._id;
      if (!userId) throw new Error("Invalid user data.");
    } catch {
      alert("Corrupted user data. Please log in again.");
      localStorage.clear();
      navigate("/auth");
      return;
    }

    try {
      setLoadingId(siteId);
      const res = await axios.post(
        `http://localhost:5000/api/users/${userId}/favorites`,
        { siteId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Added to favorites:", res.data);
      onFavoriteAdded?.(); // notify parent
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios error adding to favorites:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
      } else {
        console.error("❌ Unexpected error adding to favorites:", error);
      }

      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/auth");
      } else {
        alert(
          error.response?.data?.message || "Something went wrong. Try again."
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {sites.map((site) => (
        <Marker key={site._id} position={[site.latitude, site.longitude]}>
          <Popup>
            <div className="text-sm">
              <strong>{site.name}</strong>
              <br />
              Category: {capitalize(site.category)}
              <br />
              Website:{" "}
              {site.website ? (
                <a
                  href={site.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {site.website}
                </a>
              ) : (
                "N/A"
              )}
              <br />
              Address: {site.address || "N/A"}
              <br />
              <button
                onClick={() => handleFavorite(site._id)}
                disabled={loadingId === site._id}
                className={`mt-2 underline ${
                  loadingId === site._id
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                {loadingId === site._id ? "Adding..." : "Add to Favorites"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapDisplay;
