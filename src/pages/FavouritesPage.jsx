import React, { useState } from "react";
import { useGetPropertyQuery } from "../hooks/useDataQuery";
import { MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imagesUrl } from "../globals/apiUrls";
import { Link } from "react-router-dom";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    className: "h-full [&_div]:h-full",
};

function FavouritesPage() {
    const [favouritesIds, setFavouritesIds] = useState(
        JSON.parse(localStorage.getItem("favourites")) || []
    );

    return (
        <>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-wide p-8 px-8 sm:px-12 lg:px-24">
                Le tue proprietà preferite
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 sm:px-12 lg:px-24">
                {favouritesIds.length > 0 ? (
                    favouritesIds.map((id) => (
                        <Favourites
                            key={id}
                            id={id}
                            favouritesIds={favouritesIds}
                            setFavouritesIds={setFavouritesIds}
                        />
                    ))
                ) : (
                    <p>
                        Non hai ancora salvato nessuna proprietà nei preferiti.
                    </p>
                )}
            </div>
        </>
    );
}

function Favourites({ id, favouritesIds, setFavouritesIds }) {
    const { isLoading, isError, data } = useGetPropertyQuery(id);

    const deleteFavourite = (targetId) => {
        const updatedFavouritesIds = favouritesIds.filter(
            (id) => id !== targetId
        );
        setFavouritesIds(updatedFavouritesIds);
        localStorage.setItem(
            "favourites",
            JSON.stringify(updatedFavouritesIds)
        );
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <pre>Error</pre>;

    const property = data.results[0];

    let { img_endpoints } = property;
    img_endpoints = img_endpoints.reverse();

    return (
        <div className="flex flex-col md:flex-row lg:flex-row gap-4 w-full max-w-4xl mx-auto shadow-2xl rounded-2xl pb-3">
            {/* Slider di immagini */}
            <div className="relative w-full aspect-square p-2 overflow-hidden">
                {img_endpoints && img_endpoints.length > 0 ? (
                    <Slider {...settings}>
                        {img_endpoints.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={imagesUrl + `/${id}/` + image}
                                    alt={image}
                                    className="h-full object-cover rounded-xl"
                                />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div className="w-full h-full bg-red-950 flex items-center justify-center text-white">
                        SPAZIO PER IMMAGINE
                    </div>
                )}
            </div>

            {/* Dettagli della proprietà */}
            <section className="flex flex-col flex-wrap items-start gap-3 px-3 sm:pt-3 w-full">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider">
                    {property.title}
                </h1>
                <div className="font-semibold md:text-lg text-stone-900 hidden sm:block">
                    {property.description}
                </div>

                {/* Box "Cosa offre" nascosto su mobile */}
                <div className="hidden sm:block">
                    <span className="sm:text-xl font-bold">Cosa offre:</span>
                    <div
                        className="mt-1 grid grid-cols-2 grid-rows-2 sm:gap-y-2 text-base text-gray-500 sm:text-base border px-4 py-2 rounded-lg whitespace-nowrap w-full sm:w-auto"
                        style={{ maxWidth: "320px" }}
                    >
                        <span className="flex items-center gap-1">
                            <MdBed />
                            Stanze: {property.n_bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                            <MdBathroom />
                            Bagni: {property.n_bathrooms}
                        </span>
                        <span className="flex items-center gap-1">
                            <FaBed />
                            Letti: {property.n_beds}
                        </span>
                        <span className="flex items-center gap-1">
                            <TbRulerMeasure />
                            Superficie: {property.square_meters} m²
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 my-4 lg:justify-center items-center  text-white">
                    <button
                        onClick={() => deleteFavourite(property.id)}
                        className="bg-red-600 group rounded-lg px-10 py-5 flex justify-center items-center gap-2 max-h-[50px] max-w-[250px] cursor-pointer hover:border-red-400 transition-all duration-300 ease-in-out"
                    >
                        <div className=" relative p-2 flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600">
                            <svg
                                viewBox="0 0 1.625 1.625"
                                className="absolute -top-3 fill-white delay-100 group-hover:top-3 group-hover:animate-[spin_1s] group-hover:duration-1000"
                                height="10"
                                width="10"
                            >
                                <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                                <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                                <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                            </svg>
                            <svg
                                width="12"
                                fill="none"
                                viewBox="0 0 39 7"
                                className="origin-right duration-500 group-hover:rotate-90"
                            >
                                <line
                                    strokeWidth="4"
                                    stroke="white"
                                    y2="5"
                                    x2="39"
                                    y1="5"
                                ></line>
                                <line
                                    strokeWidth="3"
                                    stroke="white"
                                    y2="1.5"
                                    x2="26.0357"
                                    y1="1.5"
                                    x1="12"
                                ></line>
                            </svg>
                            <svg
                                width="10"
                                fill="none"
                                viewBox="0 0 33 39"
                                className=""
                            >
                                <mask fill="white" id="path-1-inside-1_8_19">
                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                                </mask>
                                <path
                                    mask="url(#path-1-inside-1_8_19)"
                                    fill="white"
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                ></path>
                                <path
                                    strokeWidth="4"
                                    stroke="white"
                                    d="M12 6L12 29"
                                ></path>
                                <path
                                    strokeWidth="4"
                                    stroke="white"
                                    d="M21 6V29"
                                ></path>
                            </svg>
                        </div>
                        <span>Elimina</span>
                    </button>
                    <Link
                        to={`/detail/${property.id}`}
                        className="group  flex gap-2 justify-center items-center max-w-[250px] relative px-10 py-4 max-h-[50px] rounded-xl bg-green-600 hover:bg-green-600 transition-all  ease-in-out"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
                        >
                            <path d="M12 4L10.6 5.4L16.2 11H4V13H16.2L10.6 18.6L12 20L20 12L12 4Z"></path>
                        </svg>
                        <span>Vedi in Dettaglio</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default FavouritesPage;
