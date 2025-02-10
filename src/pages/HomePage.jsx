import React, { useRef, useState } from "react";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card";
import { useGetPropertiesQuery } from "../hooks/useDataQuery";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRefsContext } from "../Context/RefsContext";

function HomePage() {
    const [activeFilter, setActiveFilter] = useState(null);
    const { isLoading, isError, data } = useGetPropertiesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <pre>Error</pre>;

    const filteredProperties = !activeFilter 
        ? data 
        : data.filter(prop => prop.property_type?.toLowerCase().includes(activeFilter.toLowerCase()));


    return (
        <>
            <Jumbotron />
            <SearchAndFilterSection 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
            <CardsSection title={""}>
                {filteredProperties?.map((prop) => (
                    <Card key={prop.id} property={prop} />
                ))}
            </CardsSection>
        </>
    );
}

function SearchBarMobile() {
    return <div></div>;
}

function SearchAndFilterSection({ activeFilter, onFilterChange }) {
    const filters = [
        "baita",
        "schiera",
        "indipendente",
        "villa",
        "appartamento",
        "chalet",
    ];

    return (
        <div className="border-b p-3 bg-white w-screen border-gray-300 fixed md:sticky top-[-1px] sm:top-19 z-20 rounded-b-2xl">
            <div className="overflow-x-auto">
                <div className="flex justify-center gap-10 min-w-max px-2 [&>div]:w-[40px]">
                    {filters.map((filter) => (
                        <div 
                            key={filter} 
                            className={`group flex flex-col items-center gap-2 hover:cursor-pointer ${
                                activeFilter === filter ? 'opacity-100' : 'opacity-50'
                            }`}
                            onClick={() => onFilterChange(filter === activeFilter ? null : filter)}
                        >
                            <img 
                                src={`/filter_imgs/${filter}.png`} 
                                alt={filter} 
                                className="w-6 h-6 group-hover:opacity-100"
                            />
                            <span className="text-xs text-gray-600 group-hover:opacity-100">
                                {filter}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Jumbotron() {

    const {jumboRef, headerRef} = useRefsContext()

    const handleExploreClick = () => {
        window.scrollTo({
            top: jumboRef.current.offsetHeight + headerRef.current.offsetHeight,
            behavior: "smooth",
        });
    };

    return (
        <motion.section
            ref={jumboRef}
            className="sm:h-[80vh] h-[87vh] relative z-30 bg-linear-90/oklch from-[#d4c685] to-[#a7d3a6] text-stone-800 text-center lg:text-start flex items-center p-6 px-3 lg:px-[10vw] lg:py-12 justify-center lg:gap-32 lg:[&>div]:w-1/2 rounded-b-4xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col gap-8 items-center sm:items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <div
                    style={{ fontFamily: `"Noto Sans", serif` }}
                    className="flex flex-col gap-4"
                >
                    <p className="text-5xl lg:text-6xl tracking-wide font-black">
                        Your Dream Getaway Awaits
                    </p>
                    <p className="font-black tracking-wide text-xl text-stone-700 lg:text-2xl">
                        From cozy cottages to luxurious villas, discover the
                        ideal space for your next adventure
                    </p>
                </div>
                <div
                    style={{ fontFamily: `"Noto Sans", serif` }}
                    className="flex flex-col  rounded-lg p-4 text-sm gap-4 shadow-lg "
                >
                    <div className="font-semibold lg:font-light lg:text-base">
                        <span>
                            <span className="underline underline-offset-2">
                                Already Know
                            </span>{" "}
                            What You're Looking For? <br />
                            Your{" "}
                            <strong className="font-semibold">
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
                            className="bg-[#fefae0] hover:bg-[#faedcd] px-4 py-2 rounded-md scroll-mt-[-600px] cursor-pointer"
                        >
                            Explore
                        </button>
                    </div>
                </div>
            </motion.div>
            <motion.div 
                className="hidden lg:block h-full relative -translate-y-2"
            >
                <motion.div 
                    className="absolute lg:w-40 xl:w-45 2xl:w-60 rounded-lg z-10"
                    initial={{ rotate: 0, top: "2%", left: "15%" }}
                    animate={{ rotate: -10, top: "20%", left: "23%" }}
                    whileHover={{ rotate: 0, top: "2%", left: "15%" }}

                    transition={{ duration: 0.9 }}
                >
                    <img src="/cardtest2.png" alt="villaschiera" className="w-full h-full object-cover rounded-lg overflow-hidden" />
                </motion.div>

                <motion.div 
                    className="absolute lg:w-40 xl:w-45 2xl:w-60 rounded-lg z-20"
                    initial={{ rotate: 0, top: "2%", right: "10%" }}
                    animate={{ rotate: 3, top: "20%", right: "20%" }}
                    whileHover={{ rotate: 0, top: "2%", right: "10%" }}
                    transition={{ duration: 0.9 }}
                >
                    <img src="/cardtest2.png" alt="villaschiera" className="w-full h-full object-cover rounded-lg overflow-hidden" />
                </motion.div>

                <motion.div 
                    className="absolute lg:w-40 xl:w-45 2xl:w-60 rounded-lg z-30"
                    initial={{ rotate: 0, bottom: "1%", left: "15%" }}
                    animate={{ rotate: -7, bottom: "10%", left: "20%" }}
                    whileHover={{ rotate: 0, bottom: "1%", left: "15%" }}
                    transition={{ duration: 0.9 }}
                >
                    <img src="/cardtest2.png" alt="villaschiera" className="w-full h-full object-cover rounded-lg overflow-hidden" />
                </motion.div>

                <motion.div 
                    className="absolute lg:w-40 xl:w-45 2xl:w-60 rounded-lg z-40"
                    initial={{ rotate: 0, bottom: "1%", right: "10%" }}
                    animate={{ rotate: 8, bottom: "10%", right: "20%" }}
                    whileHover={{ rotate: 0, bottom: "1%", right: "10%" }}
                    transition={{ duration: 0.9 }}
                >
                    <img src="/cardtest2.png" alt="villaschiera" className="w-full h-full object-cover rounded-lg overflow-hidden" />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default HomePage;
