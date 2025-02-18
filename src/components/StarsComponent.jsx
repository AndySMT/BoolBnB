import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarsComponent({ setRating, rating }) {
  const [hover, setHover] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="flex gap-1 text-2xl">
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rate"
              value={currentRate}
              checked={currentRate === rating}
              onChange={() => handleRating(currentRate)}
              style={{ display: "none" }}
            />
            <FaStar
              className={`max-w-96 cursor-pointer ${currentRate <= (hover || rating) ? "text-yellow-500" : "text-stone-300"}`}
              onMouseEnter={() => setHover(currentRate)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarsComponent;



