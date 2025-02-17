import React, { useEffect } from "react";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import axios from "axios";
import { baseUrl, likesEndpoint } from "../globals/apiUrls";
import { useAddLikeQuery } from "../hooks/useDataQuery";
function Heart({ propertyId }) {
    const [rating, setRating] = useState(false);

    // * QUERIES
    const { mutate } = useAddLikeQuery(propertyId);

    // * ACTIONS
    const gestioneLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mutate(propertyId);
    };

    return (
        <div>
            <button onClick={gestioneLike}>
                <FiHeart className="text-2xl hover:text-red-500 text-slate-900 opacity-70 drop-shadow-lg hover:cursor-pointer" />
            </button>
        </div>
    );
}

export default Heart;
