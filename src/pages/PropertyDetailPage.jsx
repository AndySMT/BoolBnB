import React, { useRef, useState, useEffect, useMemo, Fragment } from "react";
import Select from "react-select";
import LoadMoreButton from "../components/LoadMoreButton";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiBookmarks } from "react-icons/pi";
import { CiShare2 } from "react-icons/ci";
import { MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
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
    useGetNewReviewsQuery,
    useGetPropertyQuery,
    useInfiniteGetRevsQuery,
} from "../hooks/useDataQuery";
import { useRefsContext } from "../Context/RefsContext";
import SkeleDetailSection from "../components/SkeleDetailSection";
import ReviewComponent from "../components/ReviewComponent";
import { toast } from "react-toastify";

function PropertyDetail() {
    const { id } = useParams();
    const reviewsRef = useRef(null);
    const navigate = useNavigate();
    const newRevsCount =
        Number(window.sessionStorage.getItem("newRevsCount")) || 0;

    //* QUERIES
    // query per la proprieta
    const {
        isLoading: isLoadingP,
        isError: isErrorP,
        data: propertyRes,
    } = useGetPropertyQuery(id);

    // query per le recensioni
    const {
        isLoading: isLoadingR,
        isError: isErrorR,
        data: reviewsRes,
        fetchNextPage,
    } = useInfiniteGetRevsQuery(id, {});

    const {
        isLoading: isLoadingNR,
        isError: isErrorNR,
        data: newReviewsRes,
        refetch: refetchNR,
    } = useGetNewReviewsQuery(id, newRevsCount);

    const { mutate, isSuccess } = useAddReviewQuery(id);

    // * ACTIONS

    //   Funzione per salvare il Post
    const savePost = () => {
        const favouritesIds =
            JSON.parse(localStorage.getItem("favourites")) || [];
        if (!favouritesIds.includes(property.id)) {
            favouritesIds.push(property.id);
            localStorage.setItem("favourites", JSON.stringify(favouritesIds));
        }
    };

    //* RETURNS
    // attesa risposta
    if (isLoadingP || isLoadingR || isLoadingNR) return <SkeleDetailSection />;
    // chiamata fallita
    if (isErrorP || isErrorR || isErrorNR) navigate("/notfound");
    // risposta ricevuta
    const property = propertyRes.results[0];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-8 border-b border-stone-400">
                {/* SECTION IMAGES*/}
                <SectionImages property={property} savePost={savePost} />
                {/* sezione dettaglio */}
                <SectionDetails
                    property={property}
                    savePost={savePost}
                    reviewsCount={
                        reviewsRes.pages[0].total_quantity + newRevsCount
                    }
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
                    id={id}
                    reviewsRes={reviewsRes}
                    reviewsRef={reviewsRef}
                    fetchNextPage={fetchNextPage}
                    newReviewsRes={newReviewsRes}
                />
                {/* sezione form recensione */}
                <SectionFormRecensioni
                    id={id}
                    mutate={mutate}
                    isSuccess={isSuccess}
                    refetchNR={refetchNR}
                    newRevsCount={newRevsCount}
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
function SectionDetails({ property, savePost, reviewsCount, reviewsRef }) {
    const favouritesIds =
        JSON.parse(localStorage.getItem("favourites")) || [];

    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const [isSaved, setIsSaved] = useState(favouritesIds.includes(property.id));

    const onHeartClick = () => {
        setIsHeartClicked(true);
    };
    const onShareClick = () => {
        toast.info("Link copiato negli appunti");
        navigator.clipboard.writeText(window.location.href); // copia il link
    };
    const handleScroll = () => {
        reviewsRef.current &&
            reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const onSaveClick = () => {
        if (isSaved) {
            const newFavourites = favouritesIds.filter((id) => id !== property.id);
            localStorage.setItem("favourites", JSON.stringify(newFavourites));
            setIsSaved(false);
        } else {
            favouritesIds.push(property.id);
            localStorage.setItem("favourites", JSON.stringify(favouritesIds));
            setIsSaved(true);
            toast.success("Proprietà salvata")
        }
    }

    useEffect(() => {
        if (isHeartClicked) {
            toast.success("Like aggiunto");
            const timer = setTimeout(() => {
                setIsHeartClicked(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isHeartClicked])

    return (
        <>
            <section className="flex flex-col flex-wrap gap-3 px-3 sm:pt-3">
                <div className="flex items-center gap-4 justify-between">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider ">
                        {property.title}
                    </h1>
                    <div className="flex gap-2 items-center text-2xl ">
                        {/* HEART */}
                        <Heart classes={`${isHeartClicked && "bg-red-300"} flex items-center rounded-xl boxShad box-content py-2 px-1.5 cursor-pointer hover:text-red-500`} onClick={onHeartClick} propertyId={property.id} />
                        {/* icona condividi */}
                        <CiShare2 onClick={onShareClick}
                            className="flex items-center rounded-xl boxShad py-2 px-1.5 cursor-pointer box-content hover:text-blue-500" />
                        {/* icona Save */}
                        <PiBookmarks onClick={onSaveClick}
                            className={`${isSaved && "bg-green-300"} flex items-center rounded-xl boxShad box-content  py-2 px-1.5 cursor-pointer hover:text-green-600`} />
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
                            {reviewsCount && reviewsCount > 0
                                ? `${reviewsCount} recensioni`
                                : "Nessuna recensione"}
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
function SectionRecensioni({
    reviewsRef,
    reviewsRes,
    fetchNextPage,
    newReviewsRes,
}) {
    const { headerRef } = useRefsContext();
    const [scrollMargin, setScrollMargin] = useState("0px");
    const [reviewsCount, setReviewsCount] = useState(
        reviewsRes.pages[0].total_res || 4
    );
    const onClick = () => {
        fetchNextPage();
        setReviewsCount((curr) => curr + 4);
    };
    // Aggiorno scrollMargin quando headerRef è disponibile
    useEffect(() => {
        if (headerRef.current) {
            setScrollMargin(`${headerRef.current.offsetHeight + 20}px`);
        }
    }, [headerRef]);

    const detail = <span className="text-xs">{"(Dal più Recente)"}</span>;

    return (
        <section
            ref={reviewsRef}
            style={{ scrollMarginTop: scrollMargin }}
            className="reviews-section px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 border-b border-stone-400"
        >
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide  ">
                    Recensioni
                </h1>
            </div>

            <div className="flex flex-wrap whitespace-wrap">
                {/* reviews appena scritte */}
                {newReviewsRes?.map((rev) => (
                    <ReviewComponent key={rev.id} rev={rev} />
                ))}
                {/* reviews gia presenti */}
                {reviewsRes?.pages.map((group, i) => (
                    <Fragment key={i}>
                        {group?.results?.map((rev) => (
                            <ReviewComponent key={rev.id} rev={rev} />
                        ))}
                    </Fragment>
                ))}
            </div>
            {reviewsCount < reviewsRes?.pages[0].total_quantity && (
                <div className="flex justify-center my-4">
                    <LoadMoreButton onClick={onClick} />
                </div>
            )}
        </section>
    );
}

// SECTION FORM RECENSIONI
function SectionFormRecensioni({
    id,
    mutate,
    isSuccess,
    newRevsCount,
    refetchNR,
}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [rating, setRating] = useState(0);

    const onSubmit = (data) => {
        mutate({
            property_id: id,
            title: data.reviewTitle,
            description: data.reviewText,
            rating: data.rating,
        });
        reset();
        window.sessionStorage.setItem("newRevsCount", Number(newRevsCount) + 1);
    };

    useEffect(() => {
        if (isSuccess) {
            refetchNR();
            toast.success("Recensione pubblicata con successo!");
        }
    }, [isSuccess]);
    return (
        <section className="px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6">
            <h1
                className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4"
                id="reviews"
            >
                Lascia la tua Recensione
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex border w-fit rounded-lg p-2 gap-1">
                    Voto:{" "}
                    <StarsComponent
                        setRating={setRating}
                        rating={rating}
                        setValue={setValue}
                        trigger={trigger}
                    />
                </div>
                <p className="text-red-500">{errors?.rating?.message}</p>
                <input type="hidden" value={rating} {...register("rating")} />
                <input
                    type="text"
                    placeholder="Inserisci il titolo della recensione"
                    className="mt-4 w-full p-2 border rounded-lg"
                    {...register("reviewTitle")}
                />
                <p className="text-red-500">{errors?.reviewTitle?.message}</p>
                <textarea
                    placeholder="Scrivi una recensione"
                    className="mt-4 w-full p-2 border rounded-lg"
                    {...register("reviewText")}
                />
                <p className="text-red-500">{errors?.reviewText?.message}</p>
                <button
                    type="submit"
                    className="mt-2 px-3 sm:px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-lg sm:text-xl cursor-pointer"
                >
                    Invia recensione
                </button>
            </form>
        </section>
    );
}

const schema = yup.object().shape({
    rating: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? undefined : value
        )
        .required("Il voto è obbligatorio")
        .min(1, "Il voto minimo è 1"),
    reviewTitle: yup.string().trim().required("Il titolo è obbligatorio"),
    reviewText: yup.string().trim().required("La recensione è obbligatoria"),
});

export default PropertyDetail;
