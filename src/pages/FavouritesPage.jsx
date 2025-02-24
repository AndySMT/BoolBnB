import React, { useState } from "react";
import { useGetPropertyQuery } from "../hooks/useDataQuery";
import { MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imagesUrl } from "../globals/apiUrls";
import { Link, useNavigate } from "react-router-dom";
import { useRefsContext } from "../Context/RefsContext";
import PayPalButton from "../components/PayPalButton";
import { toast } from "react-toastify";
import LostSVG from "../components/LostSVG";
import TrashIcon from "../components/TrashIcon";
import ArrowRightIcon from "../components/ArrowRightIcon";
import SkeleFavourites from "../components/SkeleFavourites";

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
  const { headerRef } = useRefsContext();

  const [favouritesIds, setFavouritesIds] = useState(
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  const headerHeight =
    !headerRef?.current?.offsetHeight || headerRef?.current?.offsetHeight === 0
      ? 56
      : headerRef.current.offsetHeight;

  const style = {
    marginTop: `${headerHeight}px`,
  };

  return (
    <>
      <h1
        style={style}
        className="text-xl sm:text-3xl lg:text-4xl font-black tracking-wide p-8 px-8 sm:px-12 lg:px-24"
      >
        I tuoi annunci preferiti
      </h1>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 px-8 sm:px-12 lg:px-24">
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
          <div className="mt-24 sm:mt-45 absolute top-1/2 -translate-1/2 left-1/2">
            <div className="scale-125">
              <LostSVG />
            </div>
            <div className="my-12 text-center">
              <h2 className=" text-lg font-semibold">Non hai ancora salvato nessun annuncio nei preferiti</h2>
              <p>Abbiamo tanti <span className="font-semibold">annunci</span> che potrebbero <span className="font-semibold">interessarti!</span></p>
              <p> Scrivi la città che vorrai visitare sulla  <span className="font-semibold">barra di ricerca</span> in alto!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Favourites({ id, favouritesIds, setFavouritesIds }) {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [showPayPal, setShowPayPal] = useState(false);

  const handleBookNow = () => {
    setShowPayPal(true);
  };

  const handlePaymentSuccess = (details) => {
    toast.success(`Pagamento completato per ${details.payer.name.given_name}!`);
    setShowPayPal(false);
  };

  const handlePaymentError = (error) => {
    toast.error("Si è verificato un errore durante il pagamento.");
    console.error(error);
  };

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const { isLoading, isError, data } = useGetPropertyQuery(id);
  const navigate = useNavigate();

  const deleteFavourite = (targetId) => {
    const updatedFavouritesIds = favouritesIds.filter((id) => id !== targetId);
    setFavouritesIds(updatedFavouritesIds);
    localStorage.setItem("favourites", JSON.stringify(updatedFavouritesIds));
  };

  if (isLoading) return <SkeleFavourites/>;
  if (isError) navigate("/lost");

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
      <section className="flex flex-col justify-center flex-wrap items-start gap-3 px-3 sm:pt-3 w-full">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider">
          {property.title}
        </h1>
        <div className="font-semibold md:text-lg text-stone-900">
          {property.description}
        </div>

        {/* Box "Cosa offre" nascosto su mobile */}
        <div className="">
          <span className="sm:text-xl font-bold">Cosa offre:</span>
          <div
            className="mt-1 grid grid-cols-2 grid-rows-2 sm:gap-y-2 text-base text-gray-500 sm:text-base border px-4 py-2 rounded-lg whitespace-nowrap w-full sm:w-auto"
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

        <div className="grid grid-cols-2 gap-4 my-4 lg:justify-center items-center  text-white">
          <button
            onClick={() => deleteFavourite(property.id)}
            className="bg-red-700 hover:bg-red-800 group rounded-xl px-10 py-5 flex justify-center items-center gap-2 max-h-[50px]  cursor-pointer hover:border-red-400 transition-all duration-300 ease-in-out"
          >
            <div className="relative p-2 flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-700 hover:bg-red-800">
              <TrashIcon />
            </div>
            <span>Elimina</span>
          </button>
          <Link
            to={`/detail/${property.id}`}
            className="group flex gap-2 justify-center items-center relative px-10 py-4 max-h-[50px] rounded-xl bg-[#71904f] hover:bg-[#617f41] transition-all ease-in-out"
          >
            <div><ArrowRightIcon /></div>
            <span>Dettaglio</span>
          </Link>
          {/* <div className="w-full h-full text-black">
            <p className="flex justify-center font-bold">Prenota ora</p>
            <PayPalButton
              amount={100.0} // Passa il prezzo della proprietà
              currency="EUR" // Passa la valuta
              onSuccess={handlePaymentSuccess} // Funzione di successo
              onError={handlePaymentError} // Funzione di errore
            />
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default FavouritesPage;
