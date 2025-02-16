import React from 'react'
import { useState } from 'react';
import { FiHeart } from "react-icons/fi"
import axios from "axios";
import { baseUrl, likesEndpoint } from "../globals/apiUrls";
function Heart({ propertyId }) {
    const [rating, setRating] = useState(false);
    const gestioneLike = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e)
        const params = {
            property_id: propertyId
        }
        axios
            .post(`${baseUrl}${likesEndpoint}`, params)
            .then((response) => {
                console.log("la mia risposta è", response.data);
                setRating(true);
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }
    return (
        <div>
            <button onClick={gestioneLike} >
                <FiHeart className="text-2xl hover:text-red-500 text-slate-900 opacity-70 drop-shadow-lg hover:cursor-pointer" />
            </button>
        </div>
    )
}

export default Heart
