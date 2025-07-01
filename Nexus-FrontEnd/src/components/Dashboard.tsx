// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { TrashIcon, StarIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
// // // import axios from "axios";

// // // interface Site {
// // //   _id: string;
// // //   name: string;
// // //   category: string;
// // //   address?: string;
// // //   website?: string;
// // // }

// // // interface User {
// // //   _id: string;
// // //   username: string;
// // //   email: string;
// // //   location?: string;
// // //   avatarUrl?: string;
// // // }

// // // const Dashboard: React.FC = () => {
// // //   const navigate = useNavigate();
// // //   const userString = localStorage.getItem("user");
// // //   const token = localStorage.getItem("token");
// // //   const user: User | null = userString ? JSON.parse(userString) : null;

// // //   const [activeTab, setActiveTab] = useState<"favorites" | "review">("favorites");
// // //   const [savedSites, setSavedSites] = useState<Site[]>([]);
// // //   const [loadingSites, setLoadingSites] = useState(false);
// // //   const [errorSites, setErrorSites] = useState<string | null>(null);

// // //   const [review, setReview] = useState("");
// // //   const [reviewSuccess, setReviewSuccess] = useState(false);

// // //   useEffect(() => {
// // //     if (!token) return;

// // //     const fetchSavedSites = async () => {
// // //       setLoadingSites(true);
// // //       try {
// // //         const res = await axios.get("http://localhost:5000/api/sites/saved", {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         setSavedSites(res.data || []);
// // //         setErrorSites(null);
// // //       } catch (err: any) {
// // //         setErrorSites(err.response?.data?.message || "Failed to load saved sites.");
// // //       } finally {
// // //         setLoadingSites(false);
// // //       }
// // //     };

// // //     fetchSavedSites();
// // //   }, [token]);

// // //   const handleRemoveSite = async (id: string) => {
// // //     if (!token) return;
// // //     try {
// // //       await axios.delete(`http://localhost:5000/api/sites/saved/${id}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setSavedSites((prev) => prev.filter((site) => site._id !== id));
// // //     } catch {
// // //       alert("Failed to remove site");
// // //     }
// // //   };

// // //   const handleReviewSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!review.trim()) return;
// // //     setReviewSuccess(true);
// // //     setReview("");
// // //     setTimeout(() => setReviewSuccess(false), 3000);
// // //   };

// // //   if (!user) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen bg-gray-50">
// // //         <div className="text-center text-red-600">
// // //           No user data found. Please{" "}
// // //           <button onClick={() => navigate("/auth")} className="text-blue-600 underline">
// // //             log in
// // //           </button>
// // //           .
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex min-h-screen font-sans bg-[url('/path-to-image.jpg')] bg-cover bg-center">
// // //       <aside className="w-64 bg-white/80 shadow-md flex flex-col p-6">
// // //         <div className="flex flex-col items-center mb-10">
// // //           <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-5xl text-gray-600 font-bold mb-4">
// // //             {user.avatarUrl ? (
// // //               <img src={user.avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
// // //             ) : (
// // //               user.username.charAt(0).toUpperCase()
// // //             )}
// // //           </div>
// // //           <h2 className="text-xl font-semibold">{user.username}</h2>
// // //           <p className="text-gray-600 text-sm">{user.email}</p>
// // //           {user.location && <p className="text-gray-500 text-sm">{user.location}</p>}
// // //         </div>
// // //       </aside>

// // //       <main className="flex-1 p-8 bg-white/80">
// // //         <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome, {user.username}</h1>

// // //         <div className="flex space-x-4 mb-8 border-b border-gray-300">
// // //           <button
// // //             className={`flex items-center gap-2 pb-2 font-semibold transition ${
// // //               activeTab === "favorites"
// // //                 ? "border-b-4 border-blue-600 text-blue-600"
// // //                 : "text-gray-600 hover:text-blue-600"
// // //             }`}
// // //             onClick={() => setActiveTab("favorites")}
// // //           >
// // //             <StarIcon className="w-5 h-5" />
// // //             Saved Sites
// // //           </button>
// // //           <button
// // //             className={`flex items-center gap-2 pb-2 font-semibold transition ${
// // //               activeTab === "review"
// // //                 ? "border-b-4 border-blue-600 text-blue-600"
// // //                 : "text-gray-600 hover:text-blue-600"
// // //             }`}
// // //             onClick={() => setActiveTab("review")}
// // //           >
// // //             <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
// // //             Leave a Review
// // //           </button>
// // //         </div>

// // //         {activeTab === "favorites" && (
// // //           <section>
// // //             {loadingSites ? (
// // //               <p>Loading saved sites...</p>
// // //             ) : errorSites ? (
// // //               <p className="text-red-600">{errorSites}</p>
// // //             ) : savedSites.length === 0 ? (
// // //               <p className="text-gray-600 italic">You have no saved sites yet.</p>
// // //             ) : (
// // //               <ul className="space-y-4 max-w-3xl">
// // //                 {savedSites.map((site) => (
// // //                   <li
// // //                     key={site._id}
// // //                     className="bg-white/80 p-4 rounded-lg shadow-md flex justify-between items-center"
// // //                   >
// // //                     <div>
// // //                       <h3 className="font-semibold text-lg">{site.name}</h3>
// // //                       <p className="text-gray-600">{site.category}</p>
// // //                       <p className="text-sm text-gray-500">{site.address || "No address"}</p>
// // //                       {site.website && (
// // //                         <a
// // //                           href={site.website}
// // //                           target="_blank"
// // //                           rel="noopener noreferrer"
// // //                           className="text-blue-600 hover:underline text-sm"
// // //                         >
// // //                           Visit website
// // //                         </a>
// // //                       )}
// // //                     </div>
// // //                     <button
// // //                       onClick={() => handleRemoveSite(site._id)}
// // //                       className="text-red-600 hover:text-red-800 transition"
// // //                       aria-label={`Remove ${site.name}`}
// // //                     >
// // //                       <TrashIcon className="w-6 h-6" />
// // //                     </button>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             )}
// // //           </section>
// // //         )}

// // //         {activeTab === "review" && (
// // //           <section className="max-w-lg">
// // //             <form onSubmit={handleReviewSubmit} className="flex flex-col">
// // //               <textarea
// // //                 className="border border-gray-300 rounded-md p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
// // //                 placeholder="Write your review..."
// // //                 value={review}
// // //                 onChange={(e) => setReview(e.target.value)}
// // //                 rows={6}
// // //               />
// // //               <button
// // //                 type="submit"
// // //                 disabled={!review.trim()}
// // //                 className="bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-md transition hover:bg-blue-700"
// // //               >
// // //                 Submit Review
// // //               </button>
// // //               {reviewSuccess && (
// // //                 <p className="mt-3 text-green-600 font-medium">Review submitted successfully!</p>
// // //               )}
// // //             </form>
// // //           </section>
// // //         )}
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface FavoriteSite {
  id: string;
  type: string;
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  properties: {
    name: string;
    address?: string;
    website?: string;
  };
}

interface User {
  username: string;
  email: string;
  location?: string;
  avatarUrl?: string;
}

const UserProfile: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/favorites/getFavorite", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token, navigate]);

  const removeFavorite = async (featureId: string) => {
    try {
      await axios.post(
        "http://localhost:5000/api/favorites/removeFavorite",
        { featureId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFavorites((prev) => prev.filter((site) => site.id !== featureId));
      setMessage("Location removed from favorites.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Failed to remove:", err);
      alert("Failed to remove from favorites.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-red-600">
          User not found.{" "}
          <button onClick={() => navigate("/auth")} className="text-blue-600 underline">
            Log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-white shadow-md p-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-md">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            user.username?.[0]?.toUpperCase()
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        {user.location && <p className="text-gray-500 text-sm mt-1">{user.location}</p>}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite Places</h1>

        {message && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md shadow-sm">
            {message}
          </div>
        )}

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : favorites.length === 0 ? (
          <p className="text-gray-500 italic">You haven’t saved any favorites yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-5 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">{site.properties.name}</h3>
                  <p className="text-sm text-gray-500">{site.properties.address || "No address available"}</p>
                  {site.properties.website && (
                    <a
                      href={site.properties.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
                <button
                  onClick={() => removeFavorite(site.id)}
                  className="mt-4 inline-flex items-center justify-center gap-1 text-red-600 hover:text-red-800 text-sm transition"
                  title="Remove from favorites"
                >
                  <TrashIcon className="h-5 w-5" />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
