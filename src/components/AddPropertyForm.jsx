import React, { useEffect, useState, useRef, use } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddPropertyQuery } from "../hooks/useDataQuery";
// import PopUp from "../pages/PopUp";
import { toast } from "react-toastify";
import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";

function AddPropertyForm(/* { setIsFormOpen } */) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); //schema si trova sotto

  // * STATE Files
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // * Funzione per aggiungere i file selezionati
  const handleFiles = (files) => {
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  //  * Evento sui file che vengono selezionati manualmente
  const handleFileChange = (event) => {
    handleFiles(event.target.files);
  };

  // * DND
  const handleDrop = (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };
  // useDroppable hook for drag & drop area
  const { setNodeRef } = useDroppable({
    id: "file-drop-area", // Un ID per identificare l'area di drop
  });

  // * MUTATIONS
  const { mutate, isSuccess, isError, error, data } = useAddPropertyQuery();

  // * ACTIONS
  /* const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  }; */

  const onSubmit = (data) => {
    /* console.log("Form submitted!"); */ // Verifica che il form sia inviato
    const formData = new FormData();
    // Aggiungo tutti i valori del form a FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Aggiungo i file multipli
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
      // isSuccess indica la proprieta salvata nel db correttamente
      setSelectedFiles([]);
    } else if (isError) {
      toast.error("Errore nell'invio del form, riprova");
    }
  }, [isSuccess, isError /* setIsFormOpen */]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Sinistra */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-gray-700">Name</label>
            <input
              {...register("name")}
              type="text"
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: Marcolino"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Title</label>
            <input
              {...register("title")}
              type="text"
              className={`w-full p-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: Perfect house in Milan"
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Address</label>
            <input
              {...register("address")}
              type="text"
              className={`w-full p-2 border rounded ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: Via Roma 10"
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">City</label>
            <input
              {...register("city")}
              type="text"
              className={`w-full p-2 border rounded ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: Milano"
            />
            {errors.city && (
              <span className="text-red-500">{errors.city.message}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">Zip</label>
            <input
              {...register("zipcode")}
              type="number"
              className={`w-full p-2 border rounded ${
                errors.zipcode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: Milano"
              min={1}
            />
            {errors.zipcode && (
              <span className="text-red-500">{errors.zipcode.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Square Meters</label>
            <input
              {...register("square_meters")}
              type="number"
              className={`w-full p-2 border rounded ${
                errors.square_meters ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: 40"
              min={1}
            />
            {errors.square_meters && (
              <span className="text-red-500">
                {errors.square_meters.message}
              </span>
            )}
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
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: example@mail.com"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Price per Night (€)</label>
            <input
              {...register("pricePerNight")}
              type="number"
              className={`w-full p-2 border rounded ${
                errors.pricePerNight ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Es: 100"
              min={1}
            />
            {errors.pricePerNight && (
              <span className="text-red-500">
                {errors.pricePerNight.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Number of Bedrooms</label>
            <select
              {...register("n_bedrooms")}
              className={`w-full p-2 border rounded ${
                errors.n_bedrooms ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select bedrooms
              </option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
              <option value="5">5+</option>
            </select>
            {errors.n_bedrooms && (
              <span className="text-red-500">{errors.n_bedrooms.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Number of Bathrooms</label>
            <select
              {...register("n_bathrooms")}
              className={`w-full p-2 border rounded ${
                errors.n_bathrooms ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select bathrooms
              </option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
              <option value="4">4+</option>
            </select>

            {errors.n_bathrooms && (
              <span className="text-red-500">{errors.n_bathrooms.message}</span>
            )}
          </div>

          <div>
            <label className="text-gray-700">Number of Beds</label>
            <select
              {...register("n_beds")}
              className={`w-full p-2 border rounded ${
                errors.n_beds ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select beds
              </option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
              <option value="5">5+</option>
            </select>
            {errors.n_beds && (
              <span className="text-red-500">{errors.n_beds.message}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">Property Type</label>
            <select
              {...register("property_type")}
              className={`w-full p-2 border rounded ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" hidden>
                Select Type
              </option>
              <option value="Baita">Baita</option>
              <option value="Schiera">Schiera</option>
              <option value="Indipendente">Indipendente</option>
              <option value="Villa">Villa</option>
              <option value="Appartamento">Appartamento</option>
              <option value="Chalet">Chalet</option>
            </select>
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-gray-700">Upload Image</label>
          <DndContext>
            <div
              ref={setNodeRef} // Assegniamo il riferimento dell'area di drop
              className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg cursor-pointer transition hover:bg-gray-100"
              onClick={() => fileInputRef.current.click()} // 🔹 Click triggera l'input file
              onDragOver={(e) => e.preventDefault()} // 🔹 Evita comportamento default
              onDrop={handleDrop} // 🔹 Gestisce il drop dei file
            >
              <p className="text-gray-500">
                {selectedFiles.length > 0
                  ? "File caricati! Aggiungine altri..."
                  : "Trascina o clicca per caricare"}
              </p>

              {/* Input nascosto */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Lista dei file caricati */}
              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">File selezionati:</h4>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        📄 {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DndContext>
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">File selezionati:</h4>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-sm">
                    📄 {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {errors.files && (
            <span className="text-red-500">{errors.files.message}</span>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-3 transition"
          >
            📌 Add Your Property
          </button>
        </div>
      </form>
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

  property_type: yup.string().required("Tipo di proprietà è obbligatorio"),
  email: yup.string().email("Invalid email").required("Email is required"),
  /* files: yup
    .array()
    .of(
      yup
        .mixed()
        .test(
          "required",
          "Il file è obbligatorio",
          (value) => value && value.length > 0
        ) // Verifica che ci sia almeno un file
        .test("fileSize", "Il file è troppo grande", (value) => {
          return (
            value &&
            Array.from(value).every((file) => file.size <= 2 * 1024 * 1024)
          );
        })
        .test("fileType", "Formato non supportato", (value) => {
          // Verifica che ogni file sia di tipo immagine jpeg o png
          return (
            value &&
            Array.from(value).every((file) =>
              ["image/jpeg", "image/png"].includes(file.type)
            )
          );
        })
    )
    .required("Devi caricare almeno un file"), // Verifica che ci sia almeno un file */
});
