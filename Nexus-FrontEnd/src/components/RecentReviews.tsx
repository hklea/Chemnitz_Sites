import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";

interface Review {
  _id: string;
  userId: { username: string };
  reviewText: string;
  rating: number; // expected to be integer 0-5
  createdAt: string;
}

// Filled star component (yellow)
const StarFilled = () => (
  <svg
    className="w-5 h-5 text-yellow-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

// Empty star component (gray)
const StarEmpty = () => (
  <svg
    className="w-5 h-5 text-gray-300"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

const renderStars = (rating: number) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;
        return (
          <StarIcon
            key={star}
            className="w-5 h-5"
            style={{
              fill: filled ? '#fbbf24' : '#d1d5db' // yellow-400 or gray-300 fill colors
            }}
          />
        );
      })}
    </div>
  );
};

const RecentReviewsCarousel: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<number | null>(null);

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews/recent");
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to fetch recent reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentReviews();
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    const scrollAmount = 1; // pixels per tick
    const intervalTime = 30; // ms per tick

    const startScrolling = () => {
      if (scrollInterval.current !== null) return;

      scrollInterval.current = window.setInterval(() => {
        if (!carouselRef.current) return;

        carouselRef.current.scrollLeft += scrollAmount;

        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }, intervalTime);
    };

    const stopScrolling = () => {
      if (scrollInterval.current !== null) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };

    startScrolling();

    const carouselEl = carouselRef.current;
    carouselEl.addEventListener("mouseenter", stopScrolling);
    carouselEl.addEventListener("mouseleave", startScrolling);

    return () => {
      stopScrolling();
      carouselEl.removeEventListener("mouseenter", stopScrolling);
      carouselEl.removeEventListener("mouseleave", startScrolling);
    };
  }, [reviews]);

  if (loading) return <p>Loading recent reviews...</p>;

  if (reviews.length === 0)
    return <p className="italic text-gray-500">No recent reviews available.</p>;

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 p-6 rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recent Reviews</h2>
      <br></br>
      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Hide scrollbar (cross-browser) */}
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}
        </style>

        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="flex-shrink-0 w-72 p-5 bg-gray-50 rounded-xl shadow-sm flex flex-col"
          >
            <div className="flex items-center space-x-3 mb-3">
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
              <span className="font-semibold text-gray-800">{rev.userId.username}</span>
            </div>

            <p className="text-gray-700 flex-grow mb-4">&quot;{rev.reviewText}&quot;</p>

            <div className="flex items-center justify-between">
              {renderStars(rev.rating)}
              <span className="text-xs text-gray-400">
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        
      </div>
      <br />
    </div>
  );
};

export default RecentReviewsCarousel;
