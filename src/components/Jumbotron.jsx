import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRefsContext } from "../Context/RefsContext";
import { useEffect, useRef, useState } from "react";
import FastPropertySearch from "./FastPropertySearch";

const animationConfig = {
    section: {
        initial: { opacity: 0, y: -60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1.3, ease: "easeInOut" },
    },
    images: {
        duration: 1,
        delays: [0.8, 0.9, 1, 1.1],
        easing: "easeInOut",
    },
};

function Jumbotron() {
    const { jumboRef, headerRef, filterRef } = useRefsContext();

    const [filterHeight, setFilterHeight] = useState(0);

    const style =
        document.documentElement.offsetWidth < 640
            ? {
                  height: `calc(100vh - ${filterHeight + 15}px)`,
              }
            : {};

    useEffect(() => {
        if (filterRef.current) {
            setFilterHeight(filterRef.current.offsetHeight);
        }
    }, [filterRef.current]);
    console.log(window.innerHeight);
    return (
        <motion.section
            style={style}
            ref={jumboRef}
            initial={animationConfig.section.initial}
            animate={animationConfig.section.animate}
            transition={animationConfig.section.transition}
            className={`md:h-[65vh] lg:h-[80vh] relative z-30 bg-linear-90/oklch from-15% from-[#d4c685] to-[#a7d3a6] text-stone-800 text-center lg:text-start flex items-center p-6 px-3 lg:px-[10vw] lg:py-12 justify-center lg:gap-32 lg:[&>div]:w-1/2 rounded-b-4xl will-change-[opacity, transform, translate] ${
                window.innerHeight < 640 && "landscape:hidden"
            }`}
        >
            <JumboSlogan jumboRef={jumboRef} headerRef={headerRef} />
            <JumboImages />
        </motion.section>
    );
}

function JumboSlogan({ headerRef, jumboRef }) {
    const h2Ref = useRef(null);
    const width = window.innerWidth;
    const initial = { opacity: 0, x: width < 1024 ? 0 : -100, y: -40 };

    // * ACTIONS
    const handleExploreClick = () => {
        window.scrollTo({
            top:
                jumboRef.current.offsetHeight +
                headerRef.current.offsetHeight +
                25,
            behavior: "smooth",
        });
    };

    const formClassName = "grid grid-cols-2 gap-4 w-full whitespace-nowrap";

    return (
        <motion.div
            className="flex flex-col gap-8 sm:gap-12 md:gap-8 items-center md:mx-20 lg:mx-0 lg:items-start "
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        >
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl sm:text-7xl md:text-6xl lg:text-5xl xl:text-6xl tracking-wide font-black">
                    <span className="md:whitespace-nowrap">
                        Tutti i tuoi viaggi,
                    </span>{" "}
                    <span> un unico portale</span>
                </h1>
                <h2
                    ref={h2Ref}
                    className="font-black tracking-wide text-xl text-stone-700 sm:text-2xl md:text-xl xl:text-2xl "
                >
                    Dal rifugio accogliente alla villa di lusso, Trova lo Spazio
                    Perfetto per la Tua Prossima Avventura!
                </h2>
            </div>
            <div className="flex flex-col rounded-lg p-4 gap-4 shadow-lg border text-start w-full ">
                <div className="text-sm lg:text-base whitespace-nowrap">
                    <span className="underline underline-offset-2">
                        Sai già dove andare?{" "}
                        <span className="font-black">
                            Con un Click è tutto più Semplice!
                        </span>
                    </span>
                </div>
                <div className="flex gap-4 text-lg font-semibold tracking-wider lg:tracking-normal">
                    <FastPropertySearch
                        formClassName={formClassName}
                        btnClassName={"!col-span-full"}
                    >
                        Cerca
                    </FastPropertySearch>
                </div>
            </div>
            <motion.button
                initial={{ opacity: 0.03 }}
                animate={{ opacity: 0.85 }}
                transition={{
                    duration: 2,
                    delay: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                }}
                whileHover={{ opacity: 1, transition: { duration: 0.2 } }}
                onClick={handleExploreClick}
                className="absolute bg-[#fefae0] hover:bg-[#faedcd] px-1 aspect-square rounded-full cursor-pointer bottom-2 left-1/2 -translate-x-1/2 text-sm"
            >
                Esplora
            </motion.button>
        </motion.div>
    );
}

function JumboImages() {
    const { duration, delays, easing } = animationConfig.images;

    const imageAnimations = [
        { x: 40, y: 20, rotate: -3 },
        { x: -70, y: 50, rotate: 14 },
        { x: 30, y: -50, rotate: -10 },
        { x: -60, y: -30, rotate: 10 },
    ];

    const width = document.documentElement.offsetWidth;
    let baseScale;
    if (width < 1300) {
        baseScale = 80;
    } else if (width < 1800) {
        baseScale = 90;
    } else {
        baseScale = 105;
    }

    return (
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 h-full">
            {imageAnimations.map((animation, index) => (
                <motion.div
                    className={`mx-auto max-h-64 aspect-[4/5] rounded-lg border border-black`}
                    key={index}
                    style={{
                        scale: parseFloat((baseScale + index * 15) / 100),
                    }}
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{
                        opacity: 1,
                        ...animation,
                    }}
                    transition={{
                        duration,
                        delay: delays[index],
                        ease: easing,
                    }}
                    whileHover={{
                        scale: (baseScale + index * 15) / 100 + 0.04,
                        rotate: 0,
                        transition: { duration: 0.3, ease: "easeIn" },
                    }}
                >
                    <img
                        src={`/images/jumbo${index + 1}.webp`}
                        alt={`jumbo-${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-2xl"
                        loading="lazy"
                    />
                </motion.div>
            ))}
        </div>
    );
}

export default Jumbotron;
