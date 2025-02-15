import React, { useState } from "react";
import { FaStar } from "react-icons/fa";


function StarsComponent() {
  const [rating, setRating] = useState(null);

  return (
    <div className="flex gap-1 text-2xl">
      {[...Array(5)].map((star, index) => {
        const currentRate = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rate"
              value={currentRate}
              onChange={() => setRating(currentRate)}
              style={{ display: "none" }}
            />
            <FaStar className={`max-w-96 cursor-pointer ${currentRate <= rating ? "text-yellow-500" : "text-stone-300"}`} />


          </label>
        );
      })}
    </div>
  );
}

export default StarsComponent;
