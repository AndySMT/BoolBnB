import React, { useState } from "react";
import { useGetPropertyQuery } from "../hooks/useDataQuery";
import { MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FaBed, FaRegTrashAlt } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { imagesUrl } from "../globals/apiUrls";
import { useNavigate } from "react-router-dom";

function Preferiti() {
  const [preferiteIds, setPreferiteIds] = useState(
    JSON.parse(localStorage.getItem("Preferite")) || []
  );
  const [activeIndexes, setActiveIndexes] = useState({});
  const navigate = useNavigate();

  const handleThumbnailClick = (propertyId, index) => {
    setActiveIndexes((prevState) => ({
      ...prevState,
      [propertyId]: index,
    }));
  };

  const deleteFavourite = (indexToDelete) => {
    const updatedPreferite = preferiteIds.filter(
      (_, index) => index !== indexToDelete
    );
    setPreferiteIds(updatedPreferite);
    localStorage.setItem("Preferite", JSON.stringify(updatedPreferite));
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4 mt-4 flex">
        Le tue proprietà preferite
      </h1>
      <div className="flex flex-col gap-5 mt-4 max-w-[800px] pl-4">
        {preferiteIds.length > 0 ? (
          preferiteIds.map((id, index) => {
            const {
              isLoading,
              isError,
              data: property,
            } = useGetPropertyQuery(id);

            if (isLoading) return <div>Loading...</div>;
            if (isError) return <pre>Error</pre>;

            const activeIndex = activeIndexes[property.id] || 0;

            return (
              <div key={`${property.id}-${index}`} className="flex ">
                {/* Desktop Images */}
                <section className=" sm:flex gap-2 aspect-video h-full lg-w-full">
                  <div className="relative w-full sm:w-3/4 lg:w-full">
                    <img
                      src={`${imagesUrl}/${property.id}${property.img_endpoints[activeIndex]}`}
                      alt={`Property Image ${activeIndex + 1}`}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </div>
                  {/* Miniature */}
                  <div className="overflow-auto w-full sm:w-1/4 flex flex-col gap-2 p-1 border-y border-y-gray-600 rounded-md">
                    {property.img_endpoints.map((img, index) => (
                      <img
                        key={index}
                        src={`${imagesUrl}/${property.id}${img}`}
                        alt={`Thumbnail ${index + 1}`}
                        className={`w-full h-16 object-cover rounded-md cursor-pointer hover:scale-[1.02] transition-all ${
                          activeIndex === index
                            ? "outline-2 outline-blue-500"
                            : ""
                        }`}
                        onClick={() => handleThumbnailClick(property.id, index)}
                      />
                    ))}
                  </div>
                </section>

                {/* Property Details */}
                <section className="flex flex-col flex-wrap gap-3 px-3 sm:pt-3 w-full">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider">
                    {property.title}
                  </h1>
                  <div className="font-semibold md:text-lg text-stone-900">
                    {property.description}
                  </div>

                  <span className="sm:text-xl font-bold">Cosa offre:</span>
                  <div
                    className="grid grid-cols-2 grid-rows-2 sm:gap-2 text-base text-gray-500 sm:text-lg border px-4 py-2 rounded-lg whitespace-nowrap w-full sm:w-auto "
                    style={{ width: "384px" }}
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

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => deleteFavourite(index)}
                      className="bg-red-600 text-white rounded-lg py-2 px-4 flex items-center gap-2"
                    >
                      <FaRegTrashAlt /> Elimina
                    </button>
                    <button
                      onClick={() => navigate(`/detail/${property.id}`)}
                      className="bg-green-600 text-white rounded-lg py-2 px-4 flex items-center gap-2"
                    >
                      <IoArrowBackCircleOutline /> Indietro
                    </button>
                  </div>
                </section>
              </div>
            );
          })
        ) : (
          <p>Non hai ancora salvato nessuna proprietà nei preferiti.</p>
        )}
      </div>
    </>
  );
}

export default Preferiti;
