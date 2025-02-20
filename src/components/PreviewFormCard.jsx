import React from "react";
import { MdBed, MdBathroom } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PreviewFormCard = ({ property, onConfirm, onEdit }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row gap-4 w-full max-w-4xl mx-auto shadow-2xl rounded-2xl pb-3 mt-8">
      {/* Slider di immagini */}
      <div className="relative w-full aspect-square p-2 overflow-hidden">
        {property.files && property.files.length > 0 ? (
          <Slider {...settings}>
            {property.files.map((file, index) => (
              <div key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
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

        <div className="flex items-start gap-3 mt-6 relative">
          <p className="text-dark-400">
            <span>
              Modifica semplicemnete i dati oppure Pubblica il tuo annuncio
              premendo il pulsante:
            </span>
          </p>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white group rounded-lg px-10 py-5 flex justify-center items-center gap-2 max-h-[50px] max-w-[250px] cursor-pointer hover:border-green-400 transition-all duration-300 ease-in-out absolute right-7 top-7"
          >
            <span>Conferma</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PreviewFormCard;
