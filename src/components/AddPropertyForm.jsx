import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddPropertyQuery } from "../hooks/useDataQuery";
import { toast } from "react-toastify";
import { useDroppable, DndContext } from "@dnd-kit/core";
import { BiImageAdd } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import PreviewFormCard from "./PreviewFormCard";

function AddPropertyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const formData = watch(); // Ottieni i valori del form in tempo reale

  const handleFiles = (files) => {
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef.current è null!");
    }
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const files = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    setValue("files", [...selectedFiles, ...files], { shouldValidate: true });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    setValue("files", [...selectedFiles, ...files], { shouldValidate: true });
  };

  const { setNodeRef } = useDroppable({
    id: "file-drop-area",
  });

  const { mutate, isSuccess, isError } = useAddPropertyQuery();

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (selectedFiles.length > 0) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file);
      });
    }
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Annuncio pubblicato con successo!");
      navigate("/");
    } else if (isError) {
      toast.error("Errore nell'invio del form, riprova");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="px-8 sm:px-24 lg:px-130 mt-5">
        <h1 className="text-2xl font-bold text-gray-700 flex justify-center mt-5 p-3">
          Inserisci qui dettagli del tuo annuncio, lo pubblicheremo per te
        </h1>
        <form className="grid grid-cols-2 gap-3">
          {/* Sinistra */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-gray-700">Name</label>
              <input
                {...register("name")}
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.name
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.name ? `${errors.name.message}` : "Es: Marcolino"
                }
              />
            </div>

            <div>
              <label className="text-gray-700">Title</label>
              <input
                {...register("title")}
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.title
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.title
                    ? `${errors.title.message}`
                    : "Es: Perfect house in Milan"
                }
              />
            </div>

            <div>
              <label className="text-gray-700">Address</label>
              <input
                {...register("address")}
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.address
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.address
                    ? `${errors.address.message}`
                    : "Es: Via Milano 1"
                }
              />
            </div>

            <div>
              <label className="text-gray-700">City</label>
              <input
                {...register("city")}
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.city
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.city ? `${errors.city.message}` : "Es: Milano"
                }
              />
            </div>
            <div>
              <label className="text-gray-700">Zip</label>
              <input
                {...register("zipcode")}
                type="number"
                className={`w-full p-2 border rounded ${
                  errors.zipcode
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.zipcode ? `${errors.zipcode.message}` : "Es: 20124"
                }
                min={1}
              />
            </div>

            <div>
              <label className="text-gray-700">Square Meters</label>
              <input
                {...register("square_meters")}
                type="number"
                className={`w-full p-2 border rounded ${
                  errors.square_meters
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.square_meters
                    ? `${errors.square_meters.message}`
                    : "Es: 100"
                }
                min={1}
              />
            </div>
          </div>

          {/* Destra */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-gray-700">Email</label>
              <input
                {...register("email")}
                type="email"
                className={`w-full p-2 border rounded ${
                  errors.email
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.email
                    ? `${errors.email.message}`
                    : "Es: Gigi@example.com"
                }
              />
            </div>

            <div>
              <label className="text-gray-700">Price per Night (€)</label>
              <input
                {...register("pricePerNight")}
                type="number"
                className={`w-full p-2 border rounded ${
                  errors.pricePerNight
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-300"
                }`}
                placeholder={
                  errors.pricePerNight
                    ? `${errors.pricePerNight.message}`
                    : "Es: 100"
                }
                min={1}
              />
            </div>

            <div>
              <label className="text-gray-700">Number of Bedrooms</label>
              <select
                {...register("n_bedrooms")}
                className={`w-full h-[41.6px] p-2 border rounded ${
                  errors.n_bedrooms
                    ? "border-red-500 text-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" hidden>
                  {errors.n_bedrooms
                    ? errors.n_bedrooms.message
                    : "Select number of bedrooms"}
                </option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value="5">5+</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 whitespace-nowrap">
                Number of Bathrooms
              </label>
              <select
                {...register("n_bathrooms")}
                className={`w-full p-2 h-[41.6px]  border rounded ${
                  errors.n_bathrooms
                    ? "border-red-500 text-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" hidden>
                  {errors.n_bathrooms
                    ? errors.n_bathrooms.message
                    : "Select number of bathrooms"}
                </option>
                {[1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value="4">4+</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700">Number of Beds</label>
              <select
                {...register("n_beds")}
                className={`w-full p-2 h-[41.6px]  border rounded ${
                  errors.n_beds
                    ? "border-red-500 text-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" hidden>
                  {errors.n_beds
                    ? errors.n_beds.message
                    : "Select number of beds"}
                </option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700">Property Type</label>
              <select
                {...register("property_type")}
                className={`w-full h-[41.6px] p-2 border rounded 
      ${
        errors.property_type ? "border-red-500 text-red-500" : "border-gray-300"
      }
    `}
              >
                <option value="" hidden>
                  {errors.property_type
                    ? errors.property_type.message
                    : "Select Type"}
                </option>
                <option value="Baita">Baita</option>
                <option value="Schiera">Schiera</option>
                <option value="Indipendente">Indipendente</option>
                <option value="Villa">Villa</option>
                <option value="Appartamento">Appartamento</option>
                <option value="Chalet">Chalet</option>
              </select>
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-gray-700">Upload Image</label>
            <DndContext>
              <div
                ref={setNodeRef} // Assegniamo il riferimento dell'area di drop
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer transition hover:bg-gray-100"
                onClick={handleClick}
                onDragOver={(e) => e.preventDefault()} // Evita comportamento default
                onDrop={handleDrop} // Gestisce il drop dei file
              >
                <p className="text-gray-500 flex items-center justify-center text-3xl">
                  {selectedFiles.length > 0 ? (
                    "File caricati! Aggiungine altri..."
                  ) : (
                    <>
                      <BiImageAdd /> Trascina o clicca per caricare
                    </>
                  )}
                </p>

                {/* Input nascosto */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {/* Lista dei file caricati */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold">File selezionati:</h4>
                    <ul>
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-center justify-center gap-2"
                        >
                          <CiImageOn /> {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </DndContext>
            {errors.files && (
              <span className="text-red-500">{errors.files.message}</span>
            )}
            {/* <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-3 transition"
          >
            📌 Add Your Property
          </button> */}
          </div>
        </form>
        <button
          onClick={() => setShowPreview(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-3 transition"
        >
          Visualizza l'anteprima
        </button>
      </div>

      {showPreview && (
        <PreviewFormCard
          property={{ ...formData, files: selectedFiles }}
          onConfirm={() => {
            handleSubmit(onSubmit)(); // Esegui il submit del form
          }}
          onEdit={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

export default AddPropertyForm;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),

  zipcode: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Zipcode is required")
    .min(1)
    .moreThan(0, "Must be greater than zero")
    .integer("Must be an integer"),

  square_meters: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Square meters are required")
    .moreThan(0, "Must be greater than zero")
    .min(1)
    .integer("Must be an integer"),

  pricePerNight: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Price is required")
    .positive("Must be a positive number")
    .min(1)
    .moreThan(0, "Must be greater than zero"),

  n_bedrooms: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Bedrooms required")
    .min(1, "At least 1 bedroom required")
    .positive("Must be a positive number"),

  n_bathrooms: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Bathrooms required")
    .min(1, "At least 1 bathroom required"),

  n_beds: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Beds required")
    .min(1, "At least 1 bed required"),

  property_type: yup.string().required("Property type is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  files: yup
    .array()
    .min(1, "You must upload at least one file")
    .required("You must upload at least one file")
    .test("fileSize", "File too large", (files) =>
      files.every((file) => file.size <= 5 * 1024 * 1024)
    )
    .test("fileType", "Invalid file type", (files) =>
      files.every((file) =>
        ["image/jpeg", "image/png", "image/gif"].includes(file.type)
      )
    ),
});
