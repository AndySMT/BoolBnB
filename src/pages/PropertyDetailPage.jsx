import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlineLocationCity } from "react-icons/md";
import { imagesUrl } from "../globals/apiUrls";
import PaginaContact from "../components/PaginaContact";
import StarsComponent from "../components/StarsComponent";
import {
  useAddReviewQuery,
  useGetPropertyQuery,
  useGetReviewsQuery,
} from "../hooks/useDataQuery";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const newReview = {
  userName: "",
  reviewText: "",
};
function PropertyDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState(newReview);
  const [activeIndex, setActiveIndex] = useState(0);
  const { mutate } = useAddReviewQuery(id);


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const [textArea] = e.target.elements;
    const newReview = textArea?.value;
    if (!newReview || !newReview.length)
      return console.log("recensione deve avere caratteri");
    mutate({
      property_id: id,
      title: "prova title",
      description: newReview,
    });
  };

 function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  //* ACTIONS
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };
  //* QUERIES
  // query per la proprieta
  const {
    isLoading: isLoadingP,
    isError: isErrorP,
    data: property,
  } = useGetPropertyQuery(id);
  // query per le recensioni della proprieta
  const {
    isLoading: isLoadingR,
    isError: isErrorR,
    data: reviews,
  } = useGetReviewsQuery(id);

  //* RETURNS
  // attesa risposta
  if (isLoadingP || isLoadingR) return <div>Loading...</div>;
  // chiamata fallita
  if (isErrorP || isErrorR) return <pre>Error</pre>;
  // risposta ricevuta

  return (
    <div className="property-detail mx-auto p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl ">
      <section>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
          {property.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:space-x-4 scrollP ">
          <div className="flex-1 mb-4 sm:mb-0 ">
            <img
              src={`${imagesUrl}/${property.id}${property.img_endpoints[activeIndex]}`}
              alt={`Property Image ${activeIndex + 1}`}
              className="w-full max-h-96 rounded-lg object-cover boxShad"
            />
          </div>
          {/* img */}
          <div
            className="
    flex flex-row sm:flex-col justify-between 
    space-x-2 sm:space-x-0 sm:space-y-2 sm:ml-4 
    lg:max-h-96 sm:max-h-72 overflow-scroll
  "
          >
            {property.img_endpoints.map((img, index) => (
              <img
                key={index}
                src={`${imagesUrl}/${property.id}${img}`}
                alt={`Thumbnail ${index + 1}`}
                className={`boxShad w-20 h-20 rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                  activeIndex === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="text-sm sm:text-base md:text-lg mb-1 mt-1  ">
          {property.description}
          <div>
            <StarsComponent />
          </div>
        </div>
        <div className="flex space-x-4 border-b-2 pb-2 mb-2">
          <p className="text-sm sm:text-base">
            {property.n_bedrooms} camere da letto
          </p>
          <p className="text-sm sm:text-base">{property.n_bathrooms} bagni</p>
          <p className="text-sm sm:text-base"> {property.n_beds} letti</p>
        </div>
      </section>
      <section className="mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Informazioni sulla proprietà */}
          <div className="md:w-1/2 space-y-2">
            <p className="flex items-center gap-2">
              <FaHouse />
              Superficie: {property.square_meters} m²
            </p>
            <p className="flex items-center gap-2">
              <MdOutlineLocationCity />
              Città: {property.city}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Indirizzo: {property.address}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Numero civico: {property.address_number}
            </p>
            <p className="flex items-center gap-2">
              <GiFamilyHouse />
              Tipo di proprietà: {property.property_type}
            </p>
          </div>

          {/* Mappa */}
          <div className="md:w-1/2 w-full  md:h-auto boxShad">
            <MapContainer
              center={
                property.city === "Roma"
                  ? [41.8857, 12.4663]
                  : property.city === "Milano"
                  ? [45.4642, 9.19]
                  : property.city === "Palermo"
                  ? [38.1157, 13.3615]
                  : property.city === "Bologna"
                  ? [44.4949, 11.3426]
                  : property.city === "Cortina d'Ampezzo"
                  ? [46.5386, 12.1358]
                  : property.city === "Trento"
                  ? [46.0704, 11.121]
                  : property.city === "Firenze"
                  ? [43.7696, 11.2558]
                  : property.city === "Torino"
                  ? [45.0703, 7.6869]
                  : [41.9028, 12.4964] // Default (Roma)
              }
              zoom={13}
              className="leaflet-container w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={
                  property.city === "Roma"
                    ? [41.8857, 12.4663]
                    : property.city === "Milano"
                    ? [45.4642, 9.19]
                    : property.city === "Palermo"
                    ? [38.1157, 13.3615]
                    : property.city === "Bologna"
                    ? [44.4949, 11.3426]
                    : property.city === "Cortina d'Ampezzo"
                    ? [46.5386, 12.1358]
                    : property.city === "Trento"
                    ? [46.0704, 11.121]
                    : property.city === "Firenze"
                    ? [43.7696, 11.2558]
                    : property.city === "Torino"
                    ? [45.0703, 7.6869]
                    : [41.9028, 12.4964] // Default (Roma)
                }
              ></Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      <section>
        <PaginaContact />
      </section>
      <section className="border-1 rounded-[3vw]  flex max-w-96 m-auto justify-center  p-2 gap-5 boxShad">
        <div className="flex justify-between">
          <img src="/images/left.png" alt="" className="scale-x-[-1] pl-1" />
          <p className="text-center">
            Amato <br /> dagli ospiti
          </p>
          <img src="/images/left.png" alt="" className=" pl-1" />
        </div>
        <p className="text-center">
          {reviews.length} <br /> recensione
        </p>
      </section>
      <section className="reviews-section mt-6">
        <h3 className="text-xl font-semibold mb-4">Recensioni</h3>
        {reviews?.length > 0 ? (
          reviews?.map((review) => (
            <div key={review.id} className="review-card border-b-2 py-2">
              <p className="font-medium">{review.title}</p>
              <p className="text-sm text-gray-700">{review.description}</p>
              <p className="text-xs text-gray-500">{review.create_at}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        <div className=" mt-4">
          <h2 className="boxShad w-60 m-auto text-center p-2">
            Lascia la tua recensione
          </h2>
        </div>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="Inserisce il vostro nome "
            className="mt-4 w-full p-2 border rounded-lg"
            value={formData.userName}
            onChange={handleInputChange}
            name="userName"
          />
          <textarea
            placeholder="Scrivi una recensione"
            className="mt-4 w-full p-2 border rounded-lg"
            name="reviewText"
            value={formData.reviewText}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="mt-2 p-2 mb-20 bg-teal-700 text-white rounded-lg"
          >
            Invia recensione
          </button>
        </form>
      </section>
    </div>
  );
}

export default PropertyDetail;
