import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

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

interface Review {
  _id: string;
  userId: { username: string };
  reviewText: string;
  rating: number;
  createdAt: string;
}

interface User {
  username: string;
  email: string;
  location?: string;
  avatarUrl?: string;
}

const Dashboard: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [reviewInputs, setReviewInputs] = useState<Record<string, { text: string; rating: number }>>({});
  const [submittingReviewId, setSubmittingReviewId] = useState<string | null>(null);

  // New state for editing reviews
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editInputs, setEditInputs] = useState<{ text: string; rating: number }>({ text: "", rating: 0 });

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

        const reviewMap: Record<string, Review[]> = {};
        for (const site of res.data) {
          const reviewRes = await axios.get(
            `http://localhost:5000/api/reviews/site/${encodeURIComponent(site.id)}`
          );
          reviewMap[site.id] = reviewRes.data;
        }
        setReviews(reviewMap);
      } catch (err) {
        console.error("Error fetching data:", err);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites((prev) => prev.filter((site) => site.id !== featureId));
      setMessage("Location removed from favorites.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error("Failed to remove:", err);
      alert("Failed to remove from favorites.");
    }
  };

  const submitReview = async (siteId: string) => {
    const input = reviewInputs[siteId];
    if (!input?.text || !input.rating) {
      alert("Please enter review text and rating.");
      return;
    }
    try {
      setSubmittingReviewId(siteId);
      await axios.post(
        "http://localhost:5000/api/reviews/addReview",
        { featureId: siteId, reviewText: input.text, rating: input.rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Review submitted successfully.");
      setTimeout(() => setMessage(null), 3000);
      const reviewRes = await axios.get(`http://localhost:5000/api/reviews/site/${encodeURIComponent(siteId)}`);
      setReviews((prev) => ({ ...prev, [siteId]: reviewRes.data }));
      setReviewInputs((prev) => ({ ...prev, [siteId]: { text: "", rating: 0 } }));
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
    } finally {
      setSubmittingReviewId(null);
    }
  };

  // Update review via API call
  const handleSaveEdit = async (reviewId: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reviews/${reviewId}`,
        { reviewText: editInputs.text, rating: editInputs.rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Review updated successfully.");
      setTimeout(() => setMessage(null), 3000);

      // Refresh the reviews for the site of the edited review
      const siteId = favorites.find((site) =>
        reviews[site.id]?.some((r) => r._id === reviewId)
      )?.id;

      if (siteId) {
        const reviewRes = await axios.get(`http://localhost:5000/api/reviews/site/${encodeURIComponent(siteId)}`);
        setReviews((prev) => ({ ...prev, [siteId]: reviewRes.data }));
      }

      setEditingReviewId(null);
    } catch (err) {
      console.error("Error updating review:", err);
      alert("Failed to update review.");
    }
  };

  
  const hasUserReviewed = (siteId: string): boolean => {
    if (!reviews[siteId] || !user) return false;
    return reviews[siteId].some((review) => review.userId.username === user.username);
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
       <hr></hr>
      <aside className="w-full lg:w-72 bg-slate-300 shadow-md p-6 flex flex-col items-center">
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
 <div className="hidden lg:block border-l border-gray-300"></div>
      <main className="flex-1 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite Places</h1>
        {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md shadow-sm">{message}</div>}
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
                  <p className="text-sm text-gray-500">Coordinate: {site.geometry.coordinates || "No address available"}</p>
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

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Reviews:</h4>
                    {reviews[site.id]?.length ? (
                      <ul className="space-y-1">
                        {reviews[site.id].map((rev) => {
                          const isOwner = rev.userId.username === user.username;
                          const isEditing = editingReviewId === rev._id;

                          return (
                            <li key={rev._id} className="text-sm text-gray-600">
                              {isEditing ? (
                                <div className="space-y-2">
                                  <textarea
                                    rows={2}
                                    className="w-full p-2 border rounded text-sm"
                                    value={editInputs.text}
                                    onChange={(e) =>
                                      setEditInputs((prev) => ({ ...prev, text: e.target.value }))
                                    }
                                  />
                                  <StarRating
                                    rating={editInputs.rating}
                                    onChange={(star) =>
                                      setEditInputs((prev) => ({ ...prev, rating: star }))
                                    }
                                  />
                                  <div>
                                    <button
                                      className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                      onClick={() => handleSaveEdit(rev._id)}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                                      onClick={() => setEditingReviewId(null)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-between items-center">
                                  <span>
                                    <span className="font-semibold text-gray-800">{rev.userId.username}</span>: {rev.reviewText}{" "}
                                    <span className="text-yellow-500">({rev.rating}★)</span>
                                  </span>
                                  {isOwner && (
                                    <button
                                      title="Edit review"
                                      onClick={() => {
                                        setEditingReviewId(rev._id);
                                        setEditInputs({ text: rev.reviewText, rating: rev.rating });
                                      }}
                                      className="ml-2 text-blue-600 hover:text-blue-800"
                                    >
                                      ✏️
                                    </button>
                                  )}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm italic">No reviews yet.</p>
                    )}
                  </div>

                  {/* Conditionally show review form or message */}
                  {hasUserReviewed(site.id) ? (
                    <p className="text-gray-500 italic text-sm mt-4">You have already reviewed this location.</p>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <textarea
                        rows={2}
                        className="w-full p-2 border rounded text-sm"
                        placeholder="Write a review..."
                        value={reviewInputs[site.id]?.text || ""}
                        onChange={(e) =>
                          setReviewInputs((prev) => ({
                            ...prev,
                            [site.id]: {
                              ...prev[site.id],
                              text: e.target.value,
                            },
                          }))
                        }
                      />
                      <StarRating
                        rating={reviewInputs[site.id]?.rating || 0}
                        onChange={(star) =>
                          setReviewInputs((prev) => ({
                            ...prev,
                            [site.id]: {
                              ...prev[site.id],
                              rating: star,
                            },
                          }))
                        }
                      />
                      <button
                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                        onClick={() => submitReview(site.id)}
                        disabled={submittingReviewId === site.id}
                      >
                        {submittingReviewId === site.id ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
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

export default Dashboard;
