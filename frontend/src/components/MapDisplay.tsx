import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Site } from "../types/culturalSiteType";

interface MapDisplayProps {
  sites: Site[];
  onFavoriteAdded?: () => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ sites, onFavoriteAdded }) => {
  const center: LatLngExpression = [50.83, 12.92];
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [reviews, setReviews] = useState<{ [key: string]: any[] }>({});
  const [expandedPopupId, setExpandedPopupId] = useState<string | null>(null);

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

      onFavoriteAdded?.();
      setSuccessMessage(`"${res.data.featureName || "Location"}" added to favorites!`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      }
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoadingId(null);
    }
  };

  const fetchReviews = async (featureId: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reviews/site/${encodeURIComponent(featureId)}`);
      setReviews((prev) => ({ ...prev, [featureId]: res.data }));
    } catch (err) {
      console.error("Error fetching reviews:", err);
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
            <Popup
              eventHandlers={{
                add: () => {
                  fetchReviews(site.id);
                  setExpandedPopupId(site.id);
                },
              }}
            >
              <div className="text-sm">
                <strong>{site.properties.name}</strong>
                <br />
                Website: {site.properties.website ? (
                  <a href={site.properties.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {site.properties.website}
                  </a>
                ) : (
                  "N/A"
                )}
                <br />
                Address: {site.geometry.coordinates|| "N/A"}
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
                  ❤️ Add to Favorites
                </button>

                {expandedPopupId === site.id && (
                  <div className="mt-2 border-t pt-2 space-y-1">
                    <p className="font-medium">Reviews:</p>
                    {reviews[site.id]?.length > 0 ? (
                      reviews[site.id].map((rev) => (
                        <div key={rev._id} className="text-xs bg-gray-100 p-1 rounded">
                          <p>
                            <strong>{rev.userId.username}:</strong> {rev.reviewText} ⭐{rev.rating}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs italic text-gray-500">No reviews yet.</p>
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showSuccess && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-3 rounded shadow-lg flex items-center space-x-2 z-[5000000]" role="alert">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
    </>
  );
};

export default MapDisplay;
