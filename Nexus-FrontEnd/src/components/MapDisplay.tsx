// // import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import { LatLngExpression } from "leaflet";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import React, { useState } from "react";
// // import { Site } from "../types/culturalSiteType";

// // interface MapDisplayProps {
// //   sites: Site[];
// //   onFavoriteAdded?: () => void; // optional callback when favorite is added
// // }

// // const MapDisplay: React.FC<MapDisplayProps> = ({ sites, onFavoriteAdded }) => {
// //   const center: LatLngExpression = [50.83, 12.92];
// //   const navigate = useNavigate();
// //   const [loadingId, setLoadingId] = useState<string | null>(null);

// //   const capitalize = (text: string) =>
// //     text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

// //   const handleFavorite = async (featureId: string) => {
// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     alert("Please log in to save favorites.");
// //     navigate("/auth");
// //     return;
// //   }

// //   try {
// //     setLoadingId(featureId);

// //     // Correct API path and payload according to your backend
// //     const res = await axios.post(
// //       `http://localhost:5000/api/favorites/addFavorite`,
// //       { featureId },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     console.log("✅ Added to favorites:", res.data);
// //     onFavoriteAdded?.(); // notify parent component if needed
// //   } catch (error: any) {
// //     if (axios.isAxiosError(error)) {
// //       console.error("❌ Axios error adding to favorites:", {
// //         message: error.message,
// //         status: error.response?.status,
// //         data: error.response?.data,
// //         headers: error.response?.headers,
// //       });
// //     } else {
// //       console.error("❌ Unexpected error adding to favorites:", error);
// //     }

// //     if (error.response?.status === 401) {
// //       alert("Session expired. Please log in again.");
// //       localStorage.clear();
// //       navigate("/auth");
// //     } else {
// //       alert(
// //         error.response?.data?.message || "Something went wrong. Try again."
// //       );
// //     }
// //   } finally {
// //     setLoadingId(null);
// //   }
// // };

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
// // <Marker
// //   key={site.id}
// //   position={[site.geometry.coordinates[1], site.geometry.coordinates[0]]} // [latitude, longitude]
// // >

// //           <Popup>
// //             <div className="text-sm">
// //               <strong>{site.properties.name}</strong>
// //               {/* <br />
// //               Category: {capitalize(site.properties.category)}
// //               <br /> */}
// //               Website:{" "}
// //               {site.properties.website ? (
// //                 <a
// //                   href={site.properties.website}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-blue-600 underline"
// //                 >
// //                   {site.properties.website}
// //                 </a>
// //               ) : (
// //                 "N/A"
// //               )}
// //               <br />
// //               Address: {site.properties.address || "N/A"}
// //               <br />
           
// //               <button
// //                     onClick={() => handleFavorite(site.id)}
// //                     disabled={loadingId === site.id}
// //                     className={`mt-2 underline ${
// //                       loadingId === site.id
// //                         ? "text-gray-500 cursor-not-allowed"
// //                         : "text-blue-600 hover:text-blue-800"
// //                     }`}>

// //   {loadingId === site.id ? "Adding..." : "Add to Favorites"}
// // </button>

// //             </div>
// //           </Popup>
// //         </Marker>
// //       ))}
// //     </MapContainer>
// //   );
// // };

// // export default MapDisplay;
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { LatLngExpression } from "leaflet";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import React, { useState } from "react";
// import { Site } from "../types/culturalSiteType";

// interface MapDisplayProps {
//   sites: Site[];
//   onFavoriteAdded?: () => void; // optional callback when favorite is added
// }

// const MapDisplay: React.FC<MapDisplayProps> = ({ sites, onFavoriteAdded }) => {
//   const center: LatLngExpression = [50.83, 12.92];
//   const navigate = useNavigate();
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   const handleFavorite = async (featureId: string) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please log in to save favorites.");
//       navigate("/auth");
//       return;
//     }

//     try {
//       setLoadingId(featureId);

//       const res = await axios.post(
//         `http://localhost:5000/api/favorites/addFavorite`,
//         { featureId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ Added to favorites:", res.data);
//       onFavoriteAdded?.();
//     } catch (error: any) {
//       if (axios.isAxiosError(error)) {
//         console.error("❌ Axios error adding to favorites:", {
//           message: error.message,
//           status: error.response?.status,
//           data: error.response?.data,
//           headers: error.response?.headers,
//         });
//       } else {
//         console.error("❌ Unexpected error adding to favorites:", error);
//       }

//       if (error.response?.status === 401) {
//         alert("Session expired. Please log in again.");
//         localStorage.clear();
//         navigate("/auth");
//       } else {
//         alert(error.response?.data?.message || "Something went wrong. Try again.");
//       }
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; OpenStreetMap contributors"
//       />

//       {sites.map((site) => (
//         <Marker
//           key={site.id}
//           position={[site.geometry.coordinates[1], site.geometry.coordinates[0]]}
//         >
//           <Popup>
//             <div className="text-sm">
//               <strong>{site.properties.name}</strong>
//               <br />
//               Website:{" "}
//               {site.properties.website ? (
//                 <a
//                   href={site.properties.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {site.properties.website}
//                 </a>
//               ) : (
//                 "N/A"
//               )}
//               <br />
//               Address: {site.properties.address || "N/A"}
//               <br />

//               <button
//                 onClick={() => handleFavorite(site.id)}
//                 disabled={loadingId === site.id}
//                 className={`mt-2 flex items-center space-x-2 px-3 py-1 rounded-md border ${
//                   loadingId === site.id
//                     ? "border-gray-400 text-gray-400 cursor-not-allowed"
//                     : "border-red-500 text-red-600 hover:bg-red-50 hover:text-red-800 cursor-pointer transition"
//                 } focus:outline-none`}
//                 title="Add to Favorites"
//               >
//                 {loadingId === site.id ? (
//                   <svg
//                     className="animate-spin h-5 w-5 text-gray-500"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8H4z"
//                     ></path>
//                   </svg>
//                 ) : (
//                   <>
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       className="h-5 w-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
//                       />
//                     </svg>
//                     <span>Add to Favorites</span>
//                   </>
//                 )}
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
import { Site } from "../types/culturalSiteType";

interface MapDisplayProps {
  sites: Site[];
  onFavoriteAdded?: () => void; // optional callback when favorite is added
}

const MapDisplay: React.FC<MapDisplayProps> = ({ sites, onFavoriteAdded }) => {
  const center: LatLngExpression = [50.83, 12.92];
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // For popup notification
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFavorite = async (featureId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to save favorites.");
      navigate("/auth");
      return;
    }

    try {
      setLoadingId(featureId);

      const res = await axios.post(
        `http://localhost:5000/api/favorites/addFavorite`,
        { featureId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Added to favorites:", res.data);
      onFavoriteAdded?.();

      // Show success popup
      setSuccessMessage(`"${res.data.featureName || "Location"}" added to favorites!`);
      setShowSuccess(true);

      // Hide after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
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
        alert(error.response?.data?.message || "Something went wrong. Try again.");
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.geometry.coordinates[1], site.geometry.coordinates[0]]}
          >
            <Popup>
              <div className="text-sm">
                <strong>{site.properties.name}</strong>
                <br />
                Website:{" "}
                {site.properties.website ? (
                  <a
                    href={site.properties.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {site.properties.website}
                  </a>
                ) : (
                  "N/A"
                )}
                <br />
                Address: {site.properties.address || "N/A"}
                <br />

                <button
                  onClick={() => handleFavorite(site.id)}
                  disabled={loadingId === site.id}
                  className={`mt-2 flex items-center space-x-2 px-3 py-1 rounded-md border ${
                    loadingId === site.id
                      ? "border-gray-400 text-gray-400 cursor-not-allowed"
                      : "border-red-500 text-red-600 hover:bg-red-50 hover:text-red-800 cursor-pointer transition"
                  } focus:outline-none`}
                  title="Add to Favorites"
                >
                  {loadingId === site.id ? (
                    <svg
                      className="animate-spin h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                      </svg>
                      <span>Add to Favorites</span>
                    </>
                  )}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Popup notification */}
      {showSuccess && (
        <div
  className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-2 z-[5000000]"
  role="alert"
>

          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
    </>
  );
};

export default MapDisplay;
