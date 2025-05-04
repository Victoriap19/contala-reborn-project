
import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  setRating?: (rating: number) => void;
  editable?: boolean;
}

export const StarRating = ({ rating, maxRating = 5, setRating, editable = false }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  // Round to nearest 0.5
  const roundedRating = Math.round(rating * 2) / 2;
  
  const handleClick = (value: number) => {
    if (editable && setRating) {
      setRating(value);
    }
  };
  
  const handleMouseEnter = (value: number) => {
    if (editable) {
      setHoverRating(value);
    }
  };
  
  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };
  
  // Use hoverRating if available, otherwise use the actual rating
  const displayRating = hoverRating > 0 ? hoverRating : roundedRating;

  return (
    <div className="flex items-center">
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => {
          const starValue = i + 1;
          return (
            <span 
              key={i}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              className={`${editable ? "cursor-pointer" : ""} transform transition-transform hover:scale-110`}
            >
              {starValue <= displayRating ? (
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
              ) : starValue - 0.5 === displayRating ? (
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 fill-[50%] drop-shadow-sm" />
              ) : (
                <Star className="w-5 h-5 text-gray-300" />
              )}
            </span>
          );
        })}
      </div>
      <span className="ml-2 text-sm font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">{rating.toFixed(1)}</span>
    </div>
  );
};
