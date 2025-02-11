import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRefsContext } from "../Context/RefsContext";

const animationConfig = {
    section: {
        initial: { opacity: 0, y: -60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: "easeInOut" },
    },
    images: {
        duration: 0.8,
        delays: [0.6, 0.7, 0.8, 0.9],
        easing: "easeInOut",
    },
};

function Jumbotron() {
    const { jumboRef, headerRef } = useRefsContext();

    return (
        <motion.section
            ref={jumboRef}
            initial={animationConfig.section.initial}
            animate={animationConfig.section.animate}
            transition={animationConfig.section.transition}
            className="md:h-[65vh] lg:h-[80vh] h-[87vh] relative z-30 bg-linear-90/oklch from-[#d4c685] to-[#a7d3a6] text-stone-800 text-center lg:text-start flex items-center p-6 px-3 lg:px-[10vw] lg:py-12 justify-center lg:gap-32 lg:[&>div]:w-1/2 rounded-b-4xl will-change-[opacity, transform]"
        >
            <JumboSlogan jumboRef={jumboRef} headerRef={headerRef} />
            <JumboImages />
        </motion.section>
    );
}

function JumboSlogan({ headerRef, jumboRef }) {
    const handleExploreClick = () => {
        window.scrollTo({
            top: jumboRef.current.offsetHeight + headerRef.current.offsetHeight,
            behavior: "smooth",
        });
    };

    const width = document.documentElement.clientWidth;

    const initial = { opacity: 0, x: width < 1024 ? 0 : -100, y: -40 };

    return (
        <motion.div
            className="flex flex-col gap-8 items-center md:mx-20 lg:mx-0 lg:items-start"
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
            <div
                style={{ fontFamily: `"Noto Sans", serif` }}
                className="flex flex-col gap-4"
            >
                <p className="text-5xl md:text-7xl lg:text-6xl tracking-wide font-black">
                    Your Dream Getaway Awaits
                </p>
                <p className="font-black tracking-wide text-xl text-stone-700 md:text-2xl">
                    From cozy cottages to luxurious villas, discover the ideal
                    space for your next adventure
                </p>
            </div>
            <div
                style={{ fontFamily: `"Noto Sans", serif` }}
                className="flex flex-col rounded-lg p-4 text-sm gap-4 shadow-lg"
            >
                <div className="font-semibold lg:font-light lg:text-base">
                    <span>
                        <span className="underline underline-offset-2">
                            Already Know
                        </span>{" "}
                        What You're Looking For? <br />
                        Your <strong className="font-semibold">
                            Dream
                        </strong>{" "}
                        Stay is Just{" "}
                        <strong className="font-semibold">
                            One Click Away
                        </strong>
                        !
                    </span>
                </div>
                <div className="flex gap-4 whitespace-nowrap text-lg font-semibold tracking-wider lg:tracking-normal">
                    <Link
                        to={"search"}
                        className="text-center bg-[#d4c685] py-4 rounded-md w-2/3 border-2 border-stone-500 hover:bg-[#cabc7d] cursor-pointer"
                    >
                        Book Now!
                    </Link>
                    <button
                        onClick={handleExploreClick}
                        className="bg-[#fefae0] hover:bg-[#faedcd] px-4 py-2 rounded-md cursor-pointer"
                    >
                        Explore
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function JumboImages() {
    const { duration, delays, easing } = animationConfig.images;

    const imageAnimations = [
        { x: 35, y: -30, rotate: -3 },
        { x: -30, y: 15, rotate: 14 },
        { x: 0, y: -40, rotate: -10 },
        { x: -25, y: -25, rotate: 10 },
    ];

    return (
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 h-full">
            {imageAnimations.map((animation, index) => (
                <motion.div
                    key={index}
                    className={`mx-auto scale-${100 + index * 15}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, ...animation }}
                    transition={{
                        duration,
                        delay: delays[index],
                        ease: easing,
                    }}
                >
                    <img
                        src="/cardtest2.png"
                        alt={`villaschiera-${index}`}
                        className="h-full rounded-lg"
                    />
                </motion.div>
            ))}
        </div>
    );
}

export default Jumbotron;
