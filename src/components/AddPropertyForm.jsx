import React from "react";

function AddPropertyForm({ handleSubmit, setSelectedFile, errors }) {
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {/*parte sinistra */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-gray-700 flex justify-between">
            Name
            {<errors className="name"></errors> && (
              <span className="text-red-500">{errors.name}</span>
            )}
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: Marcolino"
            name="name"
          />
        </div>
        <div>
          <label className="text-gray-700 flex justify-between">
            Title
            {errors.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: Perfect house in Milan"
            name="title"
          />
        </div>
        <div>
          <label className=" text-gray-700 flex justify-between">
            Address
            {errors.address && (
              <span className="text-red-500">{errors.address}</span>
            )}
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: Via Roma 10"
            name="address"
          />
        </div>

        <div>
          <label className="flex justify-between text-gray-700">
            City
            {errors.city && <span className="text-red-500">{errors.city}</span>}
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: Milano"
            name="city"
          />
        </div>

        <div>
          <label className="flex justify-between text-gray-700">
            Square Meters
            {errors.square_meters && (
              <span className="text-red-500">{errors.square_meters}</span>
            )}
          </label>
          <input
            type="number"
            className={`w-full p-2 border rounded ${
              errors.square_meters ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: 40"
            name="square_meters"
            min={0}
          />
        </div>
        <div>
          <label className="flex justify-between text-gray-700">
            Propriery type
            {errors.type && <span className="text-red-500">{errors.type}</span>}
          </label>
          <select
            className={`w-full p-2 border rounded ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
            name="type"
          >
            <option value="" hidden>
              Proprierty type
            </option>
            <option value="1">Baita</option>
            <option value="2">Schiera</option>
            <option value="3">Indipendente</option>
            <option value="4">Villa</option>
            <option value="5">Appartamento</option>
            <option value="6">Challet</option>
          </select>
        </div>
      </div>

      {/* destra */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="flex justify-between text-gray-700">
            Email
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: Marcolino@example.com"
            name="email"
          />
        </div>
        <div>
          <label className="flex justify-between text-gray-700">
            Price per Night (€)
            {errors.pricePerNight && (
              <span className="text-red-500">{errors.pricePerNight}</span>
            )}
          </label>
          <input
            type="number"
            className={`w-full p-2 border rounded ${
              errors.pricePerNight ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Es: 100"
            name="pricePerNight"
          />
        </div>
        <div>
          <label className="flex justify-between text-gray-700">
            Number of Rooms
            {errors.n_beds && (
              <span className="text-red-500">{errors.n_beds}</span>
            )}
          </label>
          <select
            className={`w-full p-2 border rounded ${
              errors.n_bedrooms ? "border-red-500" : "border-gray-300"
            }`}
            name="n_bedrooms"
          >
            <option value="" hidden>
              Select the number of bedrooms
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div>
          <label className="flex justify-between text-gray-700">
            Number of Bathrooms
            {errors.n_bathrooms && (
              <span className="text-red-500">{errors.n_bathrooms}</span>
            )}
          </label>
          <select
            className={`w-full p-2 border rounded ${
              errors.n_bathrooms ? "border-red-500" : "border-gray-300"
            }`}
            name="n_bathrooms"
          >
            <option value="" hidden>
              Select the number of bathrooms
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div>
          <label className="flex justify-between text-gray-700">
            Number of Beds
            {errors.n_beds && (
              <span className="text-red-500">{errors.n_beds}</span>
            )}
          </label>
          <select
            className={`w-full p-2 border rounded ${
              errors.n_beds ? "border-red-500" : "border-gray-300"
            }`}
            name="n_beds"
          >
            <option value="" hidden>
              Select the number of beds
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>

      <div className="col-span-2">
        <div className="relative">
          <label className="text-gray-700">Upload Image</label>
          <input
            name="file"
            type="file"
            className="w-full p-2 border rounded border-gray-300"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            id="imageInput"
            accept="image/png, image/jpeg"
          />
          <button
            type="button"
            className="absolute top-[33px] right-1 p-0.5 bg-blue-600 hover:bg-blue-700 text-white px-4 text-sm rounded"
            onClick={() => {
              document.getElementById("imageInput").click();
            }}
          >
            Upload
          </button>
        </div>
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
