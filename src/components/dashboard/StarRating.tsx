
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  showValue?: boolean;
}

export function StarRating({ rating, showValue = true }: StarRatingProps) {
  // Redondear a 0.5 más cercano
  const roundedRating = Math.round(rating * 2) / 2;
  
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="inline-block">
          {star <= roundedRating ? (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ) : star - 0.5 === roundedRating ? (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 fill-[50%]" />
          ) : (
            <Star className="w-4 h-4 text-gray-300" />
          )}
        </span>
      ))}
      {showValue && <span className="ml-1 text-xs text-gray-500">{rating.toFixed(1)}</span>}
    </div>
  );
}
