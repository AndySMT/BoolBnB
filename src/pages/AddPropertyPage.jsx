import React from "react";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AddPropertyForm from "../components/AddPropertyForm";

function AddPropertyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <HeroSection setIsOpen={setIsOpen} />

      <InfoSection />

      {isOpen && (
        <FormSection
          setIsOpen={setIsOpen}
        >
          <AddPropertyForm
            setIsOpen={setIsOpen}
          />
        </FormSection>
      )}
    </>
  );
}

function HeroSection({ setIsOpen }) {
  const [range, setRange] = useState(0);

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };
  return (
    <section className="flex items-center justify-center h-[40vh] mt-32">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 max-w-5xl">
        {/* Testo */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-blue-600 text-4xl font-bold leading-tight">
            Apri il tuo <span className="text-red-500">BoolBnB</span>!
          </h1>
          <p className="text-gray-700 mt-3">
            Guadagna ospitando viaggiatori da tutto il mondo. Mettere in affitto
            la tua casa è facile e sicuro.
          </p>
          <div className="flex flex-col items-center md:items-start mt-5">
            <p className="text-gray-700 font-medium">
              Stima il tuo guadagno: {(range * 56.12).toFixed(2)}€
            </p>
            <input
              type="range"
              className="mt-2 w-full cursor-pointer"
              min={0}
              max={30}
              value={range}
              onChange={handleRangeChange}
            />
          </div>
          <button
            className="mt-6 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md transition"
            onClick={() => setIsOpen(true)}
          >
            💵 Apri il tuo BnB
          </button>
        </div>

        {/* Immagine */}
        <MapContainer
          center={[45.4642, 9.19]} // Milano}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
          className="z-10"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[45.4642, 9.19]}>
            {" "}
            <Popup>Fittizio Point</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section className="mt-44 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Con BoolBnB, affittare la tua casa è facile e sicuro
      </h2>

      <div className="flex flex-col items-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1661768654229-5a2eeeca1857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Superhost accogliente"
          className="w-full max-w-4xl h-auto rounded-xl shadow-lg"
        />
        <p className="mt-6 text-center text-gray-700 max-w-3xl">
          Unisciti a migliaia di host che guadagnano condividendo i loro spazi.
          Noi ci occupiamo della sicurezza e ti supportiamo in ogni fase.
        </p>
      </div>
    </section>
  );
}

function FormSection({ children }) {
  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          ✖️
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
          Add Your Property
        </h2>
        {children}
      </div>
    </section>
  );
}

export default AddPropertyPage;