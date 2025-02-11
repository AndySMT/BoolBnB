import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

function StarsComponent() {
  const [rating, setRating] = useState(null);

  return (
    <section className="flex gap-1">
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
            <FaHeart
              className="max-w-96 mt-1"
              color={currentRate <= rating ? "red" : "grey"}
            />
          </label>
        );
      })}
    </section>
  );
}

export default StarsComponent;
