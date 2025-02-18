import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiBookmarks } from "react-icons/pi";
import { CiShare2 } from "react-icons/ci";
import { MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FaMapMarkerAlt, FaBed, FaStar } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlineLocationCity } from "react-icons/md";
import { imagesUrl } from "../globals/apiUrls";
import PaginaContact from "../components/ContactHost";
import MyMapComponent from "../components/MapComponent";
import StarsComponent from "../components/StarsComponent";
import Heart from "../components/Heart";
import ChatBot from "../components/ChatBot";
import PopUp from "./PopUp";
import "leaflet/dist/leaflet.css";
import {
    useAddReviewQuery,
    useGetLikesByPropsIdQuery,
    useGetPropertyQuery,
    useGetReviewsQuery,
} from "../hooks/useDataQuery";
import { useRefsContext } from "../Context/RefsContext";
import SkeleDetailSection from "../components/SkeleDetailSection";
const schema = yup.object().shape({
    reviewTitle: yup.string().trim().required("Il titolo è obbligatorio"),
    reviewText: yup.string().trim().required("La recensione è obbligatoria"),
});
function PropertyDetail() {
    const { id } = useParams();
    const { mutate } = useAddReviewQuery(id);
    const reviewsRef = useRef(null);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    // * ACTIONS
    const onSubmit = (data) => {
        mutate({
            property_id: id,
            title: data.reviewTitle,
            description: data.reviewText,
            rating: data.rating,
        });
        reset();
    };
    //   Funzione per salvare il Post
    const savePost = () => {
        const favouritesIds =
            JSON.parse(localStorage.getItem("favourites")) || [];
        if (!favouritesIds.includes(property.id)) {
            favouritesIds.push(property.id);
            localStorage.setItem("favourites", JSON.stringify(favouritesIds));
        }
        // navigate("/favourites");
    };
    //* QUERIES
    // query per la proprieta
    const {
        isLoading: isLoadingP,
        isError: isErrorP,
        data: propertyRes,
    } = useGetPropertyQuery(id);
    // query per le recensioni della proprieta
    const {
        isLoading: isLoadingR,
        isError: isErrorR,
        data: reviewsRes,
    } = useGetReviewsQuery(id);
    // ? query per i likes della proprieta (ancora non viene usato)
    const {
        isLoading: isLoadingL,
        isError: isErrorL,
        data: likesRes,
    } = useGetLikesByPropsIdQuery(id);

    //* RETURNS
    // attesa risposta
    if (isLoadingP || isLoadingR || isLoadingL) return <SkeleDetailSection />;
    // chiamata fallita
    if (isErrorP || isErrorR || isErrorR) navigate("/notfound");
    // risposta ricevuta
    const property = propertyRes.results[0];
    const reviews = reviewsRes.results;
    const likesQty = likesRes.total_res; // ? ancora non viene usato

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-8 border-b border-stone-400">
                {/* SECTION IMAGES*/}
                <SectionImages property={property} savePost={savePost} />
                {/* sezione dettaglio */}
                <SectionDetails
                    property={property}
                    savePost={savePost}
                    reviews={reviews}
                    reviewsRef={reviewsRef}
                />
            </div>
            <div className="flex flex-col">
                {/* sezizone posizione */}
                <SectionPosition property={property} />
                {/* sezione host */}
                <SectionHost property={property} />
                {/* sezione recensioni*/}
                <SectionRecensioni
                    reviews={reviews}
                    reviewsRef={reviewsRef}
                    id={id}
                />
                {/* sezione form recensione */}
                <SectionFormRecensioni
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                    errors={errors}
                    setRating={setRating}
                // (rate) => setValue("rating", rate)
                />
            </div>
            <ChatBot propertyId={property.id} />
        </>
    );
}

// SECTION IMAGES
function SectionImages({ property, savePost }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            {/* sezione immagini mobile */}
            <section className="block sm:hidden p-4">
                <div className="flex overflow-auto rounded-lg snap-x snap-mandatory">
                    {/* <div className="absolute top-6 right-5 text-black flex items-center gap-3">
                        <span className="text-xs">icona share</span>
                        <PiBookmarks
                            onClick={savePost}
                            className="text-4xl cursor-pointer"
                        />
                    </div> */}
                    {property.img_endpoints.map((img, index) => (
                        <img
                            key={index}
                            src={`${imagesUrl}/${property.id}${img}`}
                            alt={`Thumbnail ${index + 1}`}
                            className="min-w-screen h-[37vh] object-cover snap-start"
                        />
                    ))}
                </div>
            </section>

            {/* immagini desktop e dettaglio */}
            <section className="hidden sm:flex gap-2 aspect-video h-full w-full">
                <div className="relative">
                    <img
                        src={`${imagesUrl}/${property.id}${property.img_endpoints[activeIndex]}`}
                        alt={`Property Image ${activeIndex + 1}`}
                        className="h-full aspect-video object-cover rounded-lg"
                    />
                </div>

                {/* Miniature */}
                <div className="overflow-auto w-1/4 flex flex-col gap-2 p-1 border-y border-y-gray-600 rounded-md">
                    {property.img_endpoints.map((img, index) => (
                        <img
                            key={index}
                            src={`${imagesUrl}/${property.id}${img}`}
                            alt={`Thumbnail ${index + 1}`}
                            className={`w-full aspect-[3/2] object-cover rounded-md cursor-pointer hover:scale-[1.02] transition-all ${activeIndex === index
                                ? "outline-2 outline-blue-500"
                                : ""
                                }`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
// SECTION DETAILS
function SectionDetails({ property, savePost, reviews, reviewsRef }) {
    const [clickedHeart, setClickedHeart] = useState(null);
    const [clickedShare, setClickedShare] = useState(null);
    const [clickedSave, setClickedSave] = useState(null);
    const toggleHeart = (Heart) => {
        setClickedHeart(clickedHeart === Heart ? null : Heart);
    };
    const toggleShare = (Share) => {
        setClickedShare(clickedShare === Share ? null : Share);
    };
    const toggleSave = (Save) => {
        setClickedSave(clickedSave === Save ? null : Save);
    };
    const handleScroll = () => {
        reviewsRef.current &&
            reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section className="flex flex-col flex-wrap gap-3 px-3 sm:pt-3">
                <div className="flex items-center gap-4 justify-between">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider ">
                        {property.title}
                    </h1>
                    <div className="flex gap-2 items-center text-2xl ">
                        {/* HEART */}
                        <div
                            className={`flex items-center rounded-xl boxShad  py-1 px-1.5 sm:block  
                         ${clickedHeart === "heart"
                                    ? "bg-red-400"
                                    : "bg-white"
                                }`}
                            onClick={() => toggleHeart("heart")}
                        >
                            <Heart propertyId={property.id} />
                        </div>
                        {/* icona condividi */}
                        <div
                            className={`flex items-center rounded-xl boxShad  py-2 px-1.5 sm:block  
                         ${clickedShare === "share"
                                    ? "bg-blue-400"
                                    : "bg-white"
                                }`}
                            onClick={() => toggleShare("share")}
                        >
                            <span className="text-xs underline underline-offset-2">
                                <CiShare2 className="text-2xl hover:text-blue-500 cursor-pointer" />
                            </span>
                        </div>
                        {/* icona Save */}
                        <div
                            className={`flex items-center rounded-xl boxShad   sm:block cursor-pointer  
                         ${clickedSave === "save"
                                    ? "bg-green-300"
                                    : "bg-white"
                                }`}
                            onClick={() => toggleSave("save")}
                        >
                            <button onClick={savePost} className="py-2 px-1.5">
                                <PiBookmarks className="text-2xl text-gray-700 hover:text-green-500 cursor-pointer" />
                                <span className="text-xs underline underline-offset-2"></span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Dettagli della proprietà */}
                <p className="font-semibold md:text-lg text-stone-900">
                    {property.description}
                </p>

                <span className="sm:text-xl font-bold">Cosa offre:</span>
                <div className="grid grid-cols-2 grid-rows-2 sm:gap-2 text-base text-gray-500 sm:text-lg  border px-4 py-2 rounded-lg whitespace-nowrap">
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
                {/* Amato dagli ospiti */}
                <div className="cursor-pointer mt-3" onClick={handleScroll}>
                    <div className="rounded-lg flex items-center gap-5 w-fit px-8 py-2 boxShad font-semibold">
                        <div className="flex justify-between">
                            <img
                                src="/images/left.png"
                                alt=""
                                className="scale-x-[-1] pl-1"
                            />
                            <p className="text-center text-xl">
                                Amato <br /> dagli ospiti
                            </p>
                            <img
                                src="/images/left.png"
                                alt=""
                                className="pl-1"
                            />
                        </div>
                        <p className="text-center">
                            {reviews && reviews.length > 0 ? reviews.length : 0}{" "}
                            recensioni
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

// SECTION POSITION
function SectionPosition({ property }) {
    return (
        <>
            <section className="flex flex-col lg:flex-row  items-stretch justify-between gap-12 px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 border-b border-stone-400 ">
                {/* Informazioni sulla proprietà */}
                <div className="lg:w-1/2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4 ">
                        Posizione
                    </h1>
                    <div className="grid grid-cols-2 grid-rows-2  sm:gap-2  text-gray-500 border px-1 py-2 rounded-lg whitespace-nowrap ">
                        <div className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            <div className="flex items-center gap-1">
                                <MdOutlineLocationCity />
                                <span>Città:</span>{" "}
                            </div>
                            <span className="font-normal">{property.city}</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            <div className="flex items-center gap-1">
                                <FaMapMarkerAlt />
                                <span>Indirizzo:</span>{" "}
                            </div>
                            <div>
                                <span className="font-normal">
                                    {property.address}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            <div className="flex items-center gap-1">
                                <FaMapMarkerAlt />
                                <span>Zip code:</span>
                            </div>
                            <span className="font-normal">
                                {property.zipcode}
                            </span>
                        </div>
                        <div className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            <div className="flex items-center gap-1">
                                <GiFamilyHouse />
                                <span>Tipo di proprietà:</span>{" "}
                            </div>
                            <span className="font-normal">
                                {property.property_type}
                            </span>
                        </div>
                    </div>
                    <div className="my-6 px-4 py-2 border rounded-lg whitespace-wrap">
                        {property.city === "Roma"
                            ? "Elegante quartiere di Roma, molto strategico per la sua posizione, dove troverete negozi di ogni genere, supermercati, bar, tabaccherie, caffetterie e servizi di ristorazione da asporto e non."
                            : property.city === "Milano"
                                ? "Milano è una delle città più dinamiche d'Italia, nota per la sua moda, arte e cultura. Il centro città è un mix affascinante di antico e moderno, con il famoso Duomo, gallerie d'arte e quartieri pieni di negozi di alta moda."
                                : property.city === "Firenze"
                                    ? "Firenze, culla del Rinascimento, è una città che incanta con le sue opere d'arte, i palazzi storici e la bellezza delle sue piazze. Qui potrai passeggiare lungo l'Arno, ammirare il Duomo e visitare i famosi musei come gli Uffizi."
                                    : `${property.city} è una città vivace, ricca di storia, con strade affollate, edifici moderni, parchi verdi, cultura vibrante e diverse tradizioni`}
                    </div>
                </div>

                {/* Mappa */}
                <div className="lg:w-1/2 lg:py-8 lg:px-4 ">
                    <MyMapComponent property={property} />
                </div>
            </section>
        </>
    );
}
// SECTION CONTACT HOST
function SectionHost({ property }) {
    const [showContactForm, setShowContactForm] = useState(false);
    const { id } = useParams();
    return (
        <>
            <section className="px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 border-b border-stone-400">
                <section className="flex flex-col sm:flex-row justify-between gap-4">
                    {/* Informazioni sull'Host */}
                    <div className="md:w-1/2 space-y-2 border  px-4 py-2 rounded-lg whitespace-wrap self-start">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4">
                            Informazioni sull'Host
                        </h1>
                        <div className="flex items-center gap-2 text-lg">
                            <MdOutlineLocationCity />
                            <span className="font-semibold">
                                Nome dell'host:
                            </span>
                            <span>{property?.first_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg">
                            <FaMapMarkerAlt />
                            <span className="font-semibold">
                                Cognome dell'host:
                            </span>
                            <span>{property?.last_name}</span>
                        </div>
                        <div className="my-6">{property?.host_description}</div>
                    </div>
                    {/* Mobile toggle button */}
                    <button
                        className="sm:hidden w-full py-2 px-4 bg-teal-700 text-white rounded-lg mb-4 cursor-pointer"
                        onClick={() => setShowContactForm(!showContactForm)}
                    >
                        {showContactForm
                            ? "Nascondi form contatto"
                            : "Mostra form contatto"}
                    </button>
                    {/* Contact Form */}
                    <PaginaContact
                        showContactForm={showContactForm}
                        propertyId={id}
                    />
                </section>
            </section>
        </>
    );
}
// SECTION RECENSIONE
function SectionRecensioni({ reviews, reviewsRef }) {
    const { headerRef } = useRefsContext();
    return (
        <>
            <section
                ref={reviewsRef}
                style={{
                    scrollMarginTop: `${headerRef.current.offsetHeight + 20}px`,
                }}
                className="reviews-section px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 border-b border-stone-400 "
            >   <div className="flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4">
                        Recensioni
                    </h1>
                    <div className="flex  sm:text-l lg:text-2xl font-black tracking-wide mb-4">


                        <div
                            className="flex space-x-2 border-[3px] border-stone-400 rounded-xl select-none"
                        >
                            <label
                                className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="radio"
                                    value="html"
                                    className="peer hidden"
                                // checked=""
                                />
                                <span
                                    className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out"
                                >  Filtro :</span
                                >
                            </label>

                            <label
                                className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                            >
                                <input type="radio" name="radio" value="react" className="peer hidden" />
                                <span
                                    className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#d4c685] peer-checked:to-[#a7d3a6] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out
                                   "
                                >Data</span
                                >
                            </label>

                            <label
                                className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer"
                            >
                                <input type="radio" name="radio" value="vue" className="peer hidden" />
                                <span
                                    className="tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-[#d4c685] peer-checked:to-[#a7d3a6] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out
                                   "
                                >Stelle</span
                                >
                            </label>
                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 whitespace-wrap">
                    {reviews?.length > 0 ? (
                        reviews?.map((review) => (
                            <div
                                key={review.id}
                                className="review-card boxShad max-w-96 m-2 p-2  "
                            >
                                <p className="font-medium text-xl">
                                    {review.title}
                                </p>
                                <p className="text-md text-gray-700">
                                    {review.description}
                                </p>

                                <p className="text-sm text-gray-500 flex items-center">
                                    {review.rating}
                                    <span className="flex ml-1">
                                        {[...Array(review.rating)].map((_, index) => (
                                            <FaStar key={index} className="text-yellow-500" />
                                        ))}
                                    </span>
                                </p>
                                <div className="flex justify-between 
                               ">
                                    <p>
                                    </p>
                                    <p className="text-[0.6rem] text-gray-400">
                                        {review.create_at}
                                    </p>

                                </div>

                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

            </section>
        </>
    );
}

// SECTION FORM RECENSIONI
function SectionFormRecensioni({ handleSubmit, onSubmit, register, errors }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [rating, setRating] = useState(0);

    const handleFormSubmit = (data) => {
        onSubmit({ ...data, rating });
    };


    return (
        <section
            className="px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6">
            <h1
                className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4"
                id="reviews"
            >
                Lascia la tua Recensione
            </h1>

            <h1>Lascia la tua Recensione</h1>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex border w-fit rounded-lg p-2 gap-1">
                    Voto: <StarsComponent setRating={setRating} rating={rating} />
                </div>
                <input
                    type="hidden"
                    value={rating}
                    {...register("rating")}
                />
                <input
                    type="text"
                    placeholder="Inserisci il titolo della recensione"
                    className="mt-4 w-full p-2 border rounded-lg"
                    {...register("reviewTitle")}
                />
                <textarea
                    placeholder="Scrivi una recensione"
                    className="mt-4 w-full p-2 border rounded-lg"
                    {...register("reviewText")}
                />
                <button
                    type="submit"
                    className="mt-2 px-3 sm:px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-lg sm:text-xl cursor-pointer"
                >
                    Invia recensione
                </button>
            </form>

            <PopUp
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
            >
                <h2 className="text-green-600 text-lg font-bold">
                    ✅ Recensione pubblicata con successo!
                </h2>
            </PopUp>

        </section>
    );
}


export default PropertyDetail;
