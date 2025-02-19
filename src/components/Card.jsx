import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

import { MdLocationOn, MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imagesUrl } from "../globals/apiUrls";
import { motion, useInView } from "framer-motion";
import Heart from "./Heart";
import { useRef } from "react";
import { useGetLikesByPropsIdQuery } from "../hooks/useDataQuery";

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

function Card({ property, index }) {
    let {
        id,
        title,
        first_name,
        address,
        square_meters,
        city,
        n_bedrooms,
        n_bathrooms,
        img_endpoints,
    } = property;

    // const ref = useRef(null);
    // const isInView = useInView(ref, { once: true });
    const cardVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    // * QUERIES
    const {
        data: likesRes,
        isSuccess,
        isError,
        isLoading,
    } = useGetLikesByPropsIdQuery(property.id);

    isError && console.log(data);

    return (
        <motion.div
            // ref={ref}
            variants={cardVariants}
            // variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            // initial="hidden"
            // // animate={isInView ? "visible" : "hidden"}
            // animate="visible"
            transition={{
                duration: 0.7,
                // delay: index * 0.7 * 0.3,
                ease: "easeInOut",
            }}
        >
            <Link to={"/detail/" + id} className="group cursor-pointer">
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
                    <div className="absolute top-3 right-3 p-2 transition-opacity z-10 ">
                        <Heart propertyId={property.id} />
                    </div>
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
                            {isLoading
                                ? "..."
                                : isSuccess
                                ? likesRes.total_res
                                : ""}
                        </span>
                    </div>
                    <span className="text-gray-500 text-lg lg:text-sm px-1">
                        Host: {first_name}
                    </span>

                    {/* details */}
                    <div className="grid grid-cols-2 grid-rows-2 [&>*:nth-child(even)]:justify-end mt-1 text-lg text-gray-500 lg:text-sm">
                        <div className="-translate-x-0.5 overflow-hidden overflow-ellipsis">
                            <MdLocationOn className="text-xl -translate-y-0.5 inline-block mr-0.5" />
                            <span
                                title={`${city}, ${address}`}
                            >{`${city}, ${address}`}</span>
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
