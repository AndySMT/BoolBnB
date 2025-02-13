import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiBookmarks } from "react-icons/pi";
import { MdBed, MdBathroom } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlineLocationCity } from "react-icons/md";
import { imagesUrl } from "../globals/apiUrls";
import PaginaContact from "../components/ContactHost";
import StarsComponent from "../components/StarsComponent";
import MyMapComponent from "../components/MapComponent";
import {
  useAddReviewQuery,
  useGetPropertyQuery,
  useGetReviewsQuery,
} from "../hooks/useDataQuery";
import "leaflet/dist/leaflet.css";
const newReview = {
  userName: "",
  review: "",
};

const schema = yup.object().shape({
  userName: yup.string().trim().required("Il nome è obbligatorio"),
  reviewText: yup.string().trim().required("La recensione è obbligatoria"),
});

function PropertyDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState(newReview);
  const [formError, setFormError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { mutate } = useAddReviewQuery(id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const [userField, textAreaField] = e.target.elements;
    // console.log(userField);
    // console.log(textAreaField);
    const userName = userField.value;
    const review = textAreaField.value;
    if (!userName || !userName.trim()) {
      setFormError("Il nome è obbligatorio");
      setTimeout(() => setFormError(""), 2000);
      return;
    }
    if (!review || !review.trim()) {
      setFormError("La recensione è obbligatoria");
      setTimeout(() => setFormError(""), 2000);
      return;
    }

    mutate({
      property_id: id,
      title: userName, // <==== ???
      description: review,
    });

    setFormError("");
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
  const onSubmit = (data) => {
    mutate({
      property_id: id,
      title: data.userName,
      description: data.reviewText,
    });
    reset();
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

  const handleScroll = () => {
    const section = document.getElementById("reviews");
    section.scrollIntoView({ behavior: "smooth" });
  };
  const savePost = () => {
    const preferite = JSON.parse(localStorage.getItem("Preferite")) || [];

    if (!preferite.includes(property.id)) {
      preferite.push(property.id);
      localStorage.setItem("Preferite", JSON.stringify(preferite));
    }

    navigate(`/detail/${property.id}/preferiti`);
  };

  return (
    <>
      {/* sezione immagini mobile */}
      <section className="block sm:hidden bg-red-300">
        <div className="flex overflow-auto snap-x snap-mandatory">
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
      {/* immagini desktop e dettaglio  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-8 border-b border-stone-400">
        <section className="hidden sm:flex gap-2 aspect-video h-full w-full">
          <div className="relative">
            <button
              className="absolute top-0 right-0 z-20"
              style={{ cursor: "pointer" }}
              onClick={savePost}
            >
              <PiBookmarks className=" w-15 h-20 text-red-500" />
            </button>

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
                className={`w-full aspect-[3/2] object-cover rounded-md cursor-pointer hover:scale-[1.02] transition-all ${
                  activeIndex === index ? "outline-2 outline-blue-500" : ""
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </section>
        {/* sezione dettaglio */}
        <section className="flex flex-col flex-wrap gap-3 px-3 sm:pt-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider">
            {property.title}
          </h1>
          <StarsComponent />
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
                <img src="/images/left.png" alt="" className="pl-1" />
              </div>
              <p className="text-center">
                {reviews.length}{" "}
                {reviews.length === 1 ? "recensione" : "recensioni"}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex flex-col">
        {/* sezizone posizione */}
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
                  <span className="font-normal">{property.address}</span>
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  <span>Numero civico:</span>{" "}
                </div>
                <span className="font-normal">{property.address_number}</span>
              </div>
              <div className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                <div className="flex items-center gap-1">
                  <GiFamilyHouse />
                  <span>Tipo di proprietà:</span>{" "}
                </div>
                <span className="font-normal">{property.property_type}</span>
              </div>
            </div>
            <div className="my-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quibusdam ipsa aspernatur corporis error, voluptates excepturi?
              Veniam reprehenderit provident voluptates animi.
            </div>
          </div>
          {/* Mappa */}
          <div className="lg:w-1/2 lg:py-8 lg:px-4">
            <MyMapComponent property={property} />
          </div>
        </section>

        {/* sezione host */}
        {/* Contact Form */}
        <section className="px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 border-b border-stone-400">
          <section className="flex flex-col sm:flex-row justify-between gap-4">
            {/* Informazioni sull'Host */}
            <div className="md:w-1/2 space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4">
                Informazioni sull'Host
              </h1>
              <div className="flex items-center gap-2 text-lg">
                <MdOutlineLocationCity />
                <span className="font-semibold">Nome dell'host:</span>{" "}
                <span>Nome</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <FaMapMarkerAlt />
                <span className="font-semibold">Cognome dell'host:</span>{" "}
                <span>Cognome</span>
              </div>
              <div className="my-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id,
                error in ipsum voluptate placeat ea sequi, sint eos vel natus
                nemo minus optio eius enim dolorum dolorem. Officia beatae
                laboriosam ratione eveniet perferendis suscipit delectus
                aliquid? Eos ut dolorum cumque esse, nesciunt, repellendus iusto
                vel, rerum aliquid quos atque voluptates.
              </div>
            </div>
            {/* Contact Form */}
            <PaginaContact />
          </section>
        </section>

        {/* sezione recensioni*/}
        <section className="reviews-section px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 border-b border-stone-400 ">
          <h1
            className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4"
            id="reviews"
          >
            Recensioni
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews?.length > 0 ? (
              reviews?.map((review) => (
                <div
                  key={review.id}
                  className="review-card boxShad max-w-96 m-2 p-2"
                >
                  <p className="font-medium text-xl">{review.title}</p>
                  <p className="text-md text-gray-700">{review.description}</p>
                  <p className="text-sm text-gray-500">{review.create_at}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </section>

        {/* sezione form recensione */}
        <section className="px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6 ">
          <h1
            className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4"
            id="reviews"
          >
            Lascia la tua Recensioni
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Inserisci il tuo nome"
              className="mt-4 w-full p-2 border rounded-lg"
              {...register("userName")}
            />
            <p className="text-red-500">{errors.userName?.message}</p>
            <textarea
              placeholder="Scrivi una recensione"
              className="mt-4 w-full p-2 border rounded-lg"
              {...register("reviewText")}
            />
            <p className="text-red-500">{errors.reviewText?.message}</p>
            <button
              type="submit"
              className="mt-2 px-3 sm:px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-lg sm:text-xl cursor-pointer"
            >
              Invia recensione
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default PropertyDetail;
