import { useState } from "react";

function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "text-yellow-500" : "  text-gray-300"
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default Rating;
