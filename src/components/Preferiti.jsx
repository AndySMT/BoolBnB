import React from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const navigate = useNavigate();
  const preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];
  return (
    <div>
      <h1> Preferiti </h1>
      {preferiti.length === 0 ? (
        <p> Agguingi preferite </p>
      ) : (
        <ul>
          {preferiti.map((id, index) => (
            <li key={index}>
              <p>{id}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
