import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddPropertyQuery } from "../hooks/useDataQuery";
import PopUp from "../pages/PopUp";

function AddPropertyForm({ setIsFormOpen }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) }); //schema si trova sotto
  const [selectedFiles, setSelectedFiles] = useState([]);

  // * MUTATIONS
  const { mutate, isSuccess, isError, error, data } = useAddPropertyQuery();

  // * ACTIONS
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const onSubmit = (data) => {
    console.log("Form submitted!"); // Verifica che il form sia inviato
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
      // isSuccess indica la proprieta salvata nel db correttamente
      setSelectedFiles(null);
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        setIsFormOpen(false);
      }, 750);
    }
  }, [isSuccess, isError, setIsFormOpen]);

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
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
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
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
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
          <input
            multiple={true}
            type="file"
            name="files"
            {...register("files")}
            className="w-full p-2 border rounded border-gray-300"
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
          {errors.file && (
            <span className="text-red-500">{errors.file.message}</span>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-3 transition"
          >
            📌 Add Your Property
          </button>
        </div>
      </form>
      <PopUp
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <h2 className="text-green-600 text-lg font-bold">
          ✅ Annuncio pubblicato con successo!
        </h2>
      </PopUp>
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

  property_type: yup.string().required("Type is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  files: yup
    .mixed()
    .test("required", "Il file è obbligatorio", (value) => {
      return value && value.length > 0; // Deve esserci almeno un file
    })
    // .test("fileSize", "Il file è troppo grande", (value) => {
    //   return value && value[0] && value[0].size <= 2 * 1024 * 1024; // Max 2MB
    // })
    .test("fileType", "Formato non supportato", (value) => {
      return (
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
});
