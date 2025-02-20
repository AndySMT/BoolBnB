import React, { useEffect } from "react";
import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import axios from "axios";
import { baseUrl, likesEndpoint } from "../globals/apiUrls";
import { useAddLikeQuery } from "../hooks/useDataQuery";
function Heart({ propertyId, onClick, classes }) {
    const [rating, setRating] = useState(false);

    // * QUERIES
    const { mutate } = useAddLikeQuery(propertyId);

    // * ACTIONS
    const gestioneLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mutate(propertyId);
        onClick();
    };

    return (
        <FiHeart onClick={gestioneLike} className={`${classes} hover:text-red-500 text-slate-900 opacity-70 drop-shadow-lg hover:cursor-pointer`} />
    );
}

export default Heart;
