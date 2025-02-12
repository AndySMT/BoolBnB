import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    .positive("Must be a positive number"),

  square_meters: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Square meters are required")
    .positive("Must be a positive number"),

  pricePerNight: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Price is required")
    .positive("Must be a positive number"),

  n_bedrooms: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value
    )
    .required("Bedrooms required")
    .min(1, "At least 1 bedroom required"),

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

  type: yup.string().required("Type is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  file: yup.mixed().required("Image is required"),
});

function AddPropertyForm({ setSelectedFile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
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
            <span className="text-red-500">{errors.square_meters.message}</span>
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
          />
          {errors.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
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
            {...register("type")}
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
          {...register("file")}
          className="w-full p-2 border rounded border-gray-300"
          onChange={(e) => setSelectedFile(e.target.files[0])}
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
  );
}

export default AddPropertyForm;
