import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ErrorPage() {
    // Disable scrolling
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto'; // Reset on component unmount
        };
    }, []);

    const digitAnimationLeft = {
        y: [0, -110, -110, 0, 110, 110, 0],   // Su, destra, giù, giu, sinistra, su e ritorno al centro
        x: [0, 0, 200, 200, 200, 0, 0], 
        transition: {
            duration: 6, 
            repeat: Infinity, 
            ease: [0.42, 0, 0.58, 1],
        },
    };
    
    const digitAnimationRight = {
        y: [0, 110, 110, 0, -110, -110, 0],
        x: [0, 0, -200, -200, -200, 0, 0],
        transition: {
            duration: 6, 
            repeat: Infinity, 
            ease: [0.42, 0, 0.58, 1],
        },
    };

    return (
        <div className="h-screen overflow-hidden flex justify-center items-center bg-linear-90/oklch from-[#d4c685] to-[#a7d3a6] relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-20"></div>

            <div className="text-center relative z-10">
                {/* 404 */}
                <div className="text-white text-9xl font-bold italic">
                    <motion.span className="inline-block" animate={digitAnimationLeft}>4</motion.span>
                    <span>0</span>
                    <motion.span className="inline-block" animate={digitAnimationRight}>4</motion.span>
                </div>

                {/* messaggio */}
                <div className="text-gray-400 font-bold mt-28 mb-8">
                    <div className='text-3xl text-stone-800 '>Oh no! Sembra che ti sia perso.</div>
                    <div className='pt-3 text-stone-800 opacity-70'>La pagina che stai cercando potrebbe essere stata rimossa, rinominata o temporaneamente non disponibile.</div>
                </div>

                {/* bottone */}
                <Link to="/">
                    <button className="bg-white opacity-60 text-blue-600 font-bold px-6 py-3 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                        Return to homepage
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage;
