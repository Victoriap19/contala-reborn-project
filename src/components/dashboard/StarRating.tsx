
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
  
  // Redondear a 0.5 más cercano
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
    <div className="flex">
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1;
        return (
          <span 
            key={i}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={editable ? "cursor-pointer" : ""}
          >
            {starValue <= displayRating ? (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ) : starValue - 0.5 === displayRating ? (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 fill-[50%]" />
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        );
      })}
      <span className="ml-1 text-xs text-gray-500">{rating}</span>
    </div>
  );
};
