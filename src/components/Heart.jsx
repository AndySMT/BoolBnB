import React from 'react'
import { FiHeart } from "react-icons/fi"
function Heart() {
    return (
        <div>
            <button >
                <FiHeart className="text-2xl hover:text-red-500 text-slate-900 opacity-70 drop-shadow-lg hover:cursor-pointer" />
            </button>
        </div>
    )
}

export default Heart
