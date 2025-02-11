import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { MdLocationOn, MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseUrl, imagesUrl, propsEndpoint } from "../globals/apiUrls";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Card({ property }) {
    let {
        id,
        title,
        host,
        address,
        square_meters,
        total_likes,
        city,
        n_bedrooms,
        n_bathrooms,
        img_endpoints,
    } = property;
    img_endpoints = img_endpoints.reverse();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        className: "slides-container",
    };

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: id * 0.1 }}
        >
            <Link to={"detail/" + id} className="group cursor-pointer">
                {/* Image carousel */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    {img_endpoints && img_endpoints.length > 0 ? (
                        <Slider {...settings}>
                            {img_endpoints.map((image, index) => (
                                <div key={index} className="aspect-square">
                                    <img
                                        src={imagesUrl + `/${id}/` + image}
                                        alt={image}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="w-full h-full bg-red-950 flex items-center justify-center text-white">
                            SPAZIO PER IMMAGINE
                        </div>
                    )}
                    {/* hearth */}
                    <button className="absolute top-3 right-3 p-2 transition-opacity z-10">
                        <FaHeart className="text-2xl hover:text-red-500 text-white opacity-70 drop-shadow-lg hover:cursor-pointer" />
                    </button>
                </div>
                {/* location and rating */}
                <div className="flex flex-col py-1 text-xl lg:text-base whitespace-nowrap">
                    <div className="flex justify-between items-center px-1 gap-8 text-2xl lg:text-lg">
                        <span
                            title={title}
                            className="font-semibold overflow-ellipsis overflow-hidden"
                        >
                            {title}
                        </span>
                        <span className="flex items-center gap-1">
                            <AiFillStar className="translate-y-[1.5px]" />
                            {total_likes}
                        </span>
                    </div>
                    <span className="text-gray-500 text-lg lg:text-sm px-1">
                        Host: {host}
                    </span>

                    {/* details */}
                    <div className="grid grid-cols-2 grid-rows-2 [&>*:nth-child(even)]:justify-end mt-1 text-lg text-gray-500 lg:text-sm">
                        <div className="-translate-x-0.5 overflow-hidden overflow-ellipsis">
                            <MdLocationOn className="text-xl -translate-y-0.5 inline-block mr-0.5" />
                            <span>{`${address}, ${city}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MdBed className="text-lg" />
                            <span>
                                {n_bedrooms}{" "}
                                {n_bedrooms === 1 ? "Stanza" : "Stanze"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MdBathroom className="text-lg" />
                            <span>
                                {n_bathrooms}{" "}
                                {n_bathrooms === 1 ? "Bagno" : "Bagni"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TbRulerMeasure className="text-lg" />
                            <span>{square_meters} m²</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default Card;
