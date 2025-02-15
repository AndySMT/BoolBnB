import React from 'react'
import { FaHeart } from "react-icons/fa";
function Heart() {
    return (
        <div>
            <button >
                <FaHeart className="text-2xl hover:text-red-500 text-white opacity-70 drop-shadow-lg hover:cursor-pointer" />
            </button>
        </div>
    )
}

export default Heart
