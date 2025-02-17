import React from "react";
import { FaStar } from "react-icons/fa";

function StarsComponent({ setRating, rating }) {
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
              className={`max-w-96 cursor-pointer ${currentRate <= rating ? "text-yellow-500" : "text-stone-300"}`}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarsComponent;


