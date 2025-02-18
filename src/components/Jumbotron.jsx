import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRefsContext } from "../Context/RefsContext";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { IoMdSearch } from "react-icons/io";

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

    return (
        <motion.section
            style={style}
            ref={jumboRef}
            initial={animationConfig.section.initial}
            animate={animationConfig.section.animate}
            transition={animationConfig.section.transition}
            className="md:h-[65vh] lg:h-[80vh] relative z-30 bg-linear-90/oklch from-15% from-[#d4c685] to-[#a7d3a6] text-stone-800 text-center lg:text-start flex items-center p-6 px-3 lg:px-[10vw] lg:py-12 justify-center lg:gap-32 lg:[&>div]:w-1/2 rounded-b-4xl will-change-[opacity, transform, translate]"
        >
            <JumboSlogan jumboRef={jumboRef} headerRef={headerRef} />
            <JumboImages />
        </motion.section>
    );
}

const customStyles = {
    control: (_provided) => ({
        display: "flex",
        textAlign: "start",
        paddingInline: "4px",
        paddingBlock: "4px",
        border: "none",
        borderBottom: "1px solid black",
        borderRadius: "0",
    }), //style della select
    option: (provided, state) => ({
        ...provided,
        paddingInline: "4px",
        backgroundColor: `${state.isSelected ? "#7da872" : ""}`,
        ":hover": {
            backgroundColor: `${!state.isSelected ? "#badab3" : ""}`,
        },
    }), //style delle options
    placeholder: (provided) => ({
        ...provided,
        color: "#7d7555",
    }),
};

const typeOptions = [
    { value: "tutti", label: "Tutto" },
    { value: "villa", label: "Villa" },
    { value: "appartamento", label: "Appartamento" },
    { value: "chalet", label: "Chalet" },
    { value: "baita", label: "Baita" },
    { value: "attico", label: "Attico" },
    { value: "casa_indipendente", label: "Casa indipendente" },
    { value: "villetta a schiera", label: "Villa a schiera" },
];

function JumboSlogan({ headerRef, jumboRef }) {
    const h2Ref = useRef(null);
    const [optSelected, setOptSelected] = useState({});
    const width = document.documentElement.clientWidth;
    const initial = { opacity: 0, x: width < 1024 ? 0 : -100, y: -40 };
    const navigate = useNavigate();

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

    const onSubmit = (e) => {
        e.preventDefault();
        const [input] = e.target.elements;
        navigate("/search", {
            state: {
                city: input.value,
                type: optSelected.value !== "tutti" ? optSelected.value : "",
            },
        });
    };

    return (
        <motion.div
            className="flex flex-col gap-8 items-center md:mx-20 lg:mx-0 lg:items-start "
            initial={initial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        >
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl md:text-7xl lg:text-6xl tracking-wide font-black">
                    <span>Tutti i tuoi viaggi, un unico portale</span>
                </h1>
                <h2
                    ref={h2Ref}
                    className="font-black tracking-wide text-xl text-stone-700 md:text-2xl overflow-hidden transition-all duration-700 h-[100px] sm:h-auto"
                >
                    Dal rifugio accogliente alla villa di lusso, Trova lo Spazio
                    Perfetto per la Tua Prossima Avventura!
                </h2>
            </div>
            <div className="flex flex-col rounded-lg p-4  gap-4 shadow-lg border text-start w-full">
                <div className="text-sm lg:text-base">
                    <span className="underline underline-offset-2">
                        Sai già dove andare?{" "}
                        <span className="font-black">
                            Con un Click è tutto più Semplice!
                        </span>
                    </span>
                </div>
                <div className="flex gap-4 text-lg font-semibold tracking-wider lg:tracking-normal">
                    <form
                        onSubmit={onSubmit}
                        onFocus={() => {
                            h2Ref.current.classList.add("!h-0");
                            h2Ref.current.classList.add("sm:!h-auto");
                        }}
                        onBlur={() => {
                            h2Ref.current.classList.remove("!h-0");
                            h2Ref.current.classList.remove("sm:!h-auto");
                        }}
                        className="grid grid-cols-2 gap-4 w-full whitespace-nowrap"
                    >
                        <input
                            type="text"
                            className="border-b border-black  px-4 py-2 focus:outline-none "
                            placeholder="Città"
                        />
                        <Select
                            classNames={{
                                control: (state) =>
                                    state.isFocused
                                        ? "text-red-400"
                                        : "text-blue-400",
                            }}
                            styles={customStyles}
                            options={typeOptions}
                            placeholder="Tipo di casa"
                            // defaultValue={typeOptions[0]}
                            isSearchable={false}
                            type="text"
                            onChange={(opt) => setOptSelected(opt)}
                        />
                        <button
                            type="submit"
                            className=" px-4 py-2 col-span-full bg-[#7da872] text-white rounded-lg hover:bg-[#688f5f] flex justify-center items-center gap-4 text-2xl"
                        >
                            Cerca
                        </button>
                    </form>
                    {/* <Link
                        to={"search"}
                        className="text-center bg-[#d4c685] py-4 rounded-md w-2/3 border-2 border-stone-500 hover:bg-[#cabc7d] cursor-pointer"
                    >
                        Book Now!
                    </Link> */}
                </div>
            </div>
            <motion.button
                initial={{ opacity: 0.04 }}
                animate={{ opacity: 0.7 }}
                transition={{
                    duration: 3,
                    delay: 5,
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
