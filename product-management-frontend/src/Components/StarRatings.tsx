import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5 }) => {
  return (
    <div className='flex'>
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "currentColor" : "none"}
          className={index < rating ? "text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

export default StarRating;
