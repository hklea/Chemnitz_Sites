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
<Marker
  key={site.id}
  position={[site.geometry.coordinates[1], site.geometry.coordinates[0]]} // [latitude, longitude]
>

          <Popup>
            <div className="text-sm">
              <strong>{site.properties.name}</strong>
              {/* <br />
              Category: {capitalize(site.properties.category)}
              <br /> */}
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
                onClick={() => handleFavorite(site.properties._id)}
                disabled={loadingId === site.properties._id}
                className={`mt-2 underline ${
                  loadingId === site.properties._id
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                {loadingId === site.properties._id ? "Adding..." : "Add to Favorites"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapDisplay;
