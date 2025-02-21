import React from "react";
import { MdBed, MdBathroom } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PreviewFormCard = ({ property, onConfirm, onEdit }) => {
  console.log(property)
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    className: "h-full [&_div]:h-full",
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:h-[500px] lg:h-[400px] shadow-lg rounded-2xl my-8 p-2">
      {/* Slider di immagini */}
      <div className="w-full sm:h-full h-[200px] overflow-hidden rounded-xl">
        {property.files && property.files.length > 0 ? (
          <Slider {...settings}>
            {property.files.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-full w-full object-cover rounded-xl"
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
      <section className="flex flex-col items-start gap-3 px-3 sm:pt-3 w-full">
        <div className="flex flex-wrap justify-between gap-1 items-center w-full">
          <h1 className="text-xl sm:text-3xl lg:text-3xl font-black tracking-wider">
            {property.title || "Titolo mancante"}
          </h1>
          <div className="text-sm">
            <h2>Proprietario:</h2>
            <span>{property.first_name || "nome"} {property.last_name || "cognome"}</span>
            </div>
        </div>
        <div className="font-semibold md:text-lg text-stone-900 hidden sm:block">
          {property.description}
        </div>

        {/* Box "Cosa offre" nascosto su mobile */}
        <div className="w-full">
          <span className="sm:text-lg font-bold">Cosa offre:</span>
          <div
            className="mt-1 grid grid-cols-2 grid-rows-2 sm:grid-cols-1 sm:grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-y-2 text-sm text-gray-500 border px-4 py-2 rounded-lg whitespace-nowrap"
          >
            <span className="flex items-center gap-1">
              <MdBed />
              Stanze: {property.n_bedrooms || "Da inserire"}
            </span>
            <span className="flex items-center gap-1">
              <MdBathroom />
              Bagni: {property.n_bathrooms || "Da inserire"}
            </span>
            <span className="flex items-center gap-1">
              <FaBed />
              Letti: {property.n_beds || "Da inserire"}
            </span>
            <span className="flex items-center gap-1">
              <TbRulerMeasure />
              Superficie: {property.square_meters || "Da inserire"} m²
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <div className="text-dark-400 flex flex-col text-sm gap-1">
            <span>Controlla che i dati siano correttamente inseriti.</span>
            <span>Modifica i campi che ritieni opportuno cambiare oppure clicca sul pulsante per confermare definitivamente</span>
          </div>
          <button
            onClick={onConfirm}
            className="w-full lg:w-1/2 mx-auto bg-[#b6cf97da] text-stone-600 hover:text-white rounded-lg px-4 py-2 flex justify-center items-center gap-2 cursor-pointer hover:bg-[#90aa72] transition-all duration-300 ease-in-out"
          >
            Conferma
          </button>
        </div>
      </section>
    </div>
  );
};

export default PreviewFormCard;
