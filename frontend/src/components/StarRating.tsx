import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  rating: number;
  onChange: (newRating: number) => void;
}

const StarRating: React.FC<Props> = ({ rating, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;
        return (
          <StarIcon
            key={star}
            onClick={() => onChange(star)}
            className="h-5 w-5 cursor-pointer"
            style={{
              fill: filled ? '#fbbf24' : '#d1d5db' // yellow-400 or gray-300 fill color
            }}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
