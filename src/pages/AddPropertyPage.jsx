import React, { useEffect } from "react";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAddPropertyQuery } from "../hooks/useDataQuery";
import AddPropertyForm from "../components/AddPropertyForm";
import { useNavigate } from "react-router-dom";
/* import { useForm, SubmitHandleer } from "react-hook-form"; */

// TODO: RIFARE VALIDAZIONE SPECIFICA: VEDERE handleSubmit

function AddPropertyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const { mutate, isSuccess, isError, error, data } = useAddPropertyQuery();
  const navigate = useNavigate();

  // * ACTIONS
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    // oggetto formData per l'encoding automatico
    const formDataToSend = new FormData();
    // creo un array degli elementi del form
    const formArray = Array.from(event.target.elements);
    // creo un oggetto a partire dagli elementi di input
    // prendo solo gli elementi necessari, es text number.. NO submit NO file ecc
    const formObj = formArray.reduce((acc, curr) => {
      if (
        curr.type == "text" ||
        curr.type == "number" ||
        curr.tagName.toLowerCase() == "select"
      ) {
        return { ...acc, [curr.name]: curr.value };
      }
      return acc;
    }, {});
    // validation, da completare
    for (const [key, value] of Object.entries(formObj)) {
      // generalizzato => specificare in base a key il tipo di validazione
      // usare la var reattiva errors per aggiungere gli errori di validazione per ogni campo
      if (!value || !value.trim().length) {
        isValid = false;
        console.log("campi non validati");
      } else {
        formDataToSend.append(key, value);
      }
    }
    if (!isValid) return;
    // appendo il tipo file al formData
    if (selectedFile) {
      formDataToSend.append("file", selectedFile);
    }
    // eseguo la mutazione per la chiamata in post
    // vedere useAddPropertyQuery
    mutate(formDataToSend);
  };

  useEffect(() => {
    // isError indica che la query è fallita
    if (isError) {
      console.log(error.message);
    }
    if (isSuccess) {
      // isSuccess indica la proprieta salvata nel db correttamente
      console.log(data);
      setIsOpen(false);
      setSelectedFile(null);
      data.id && navigate(`/detail/${data.id}`);
    }
  }, [isSuccess, isError]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection setIsOpen={setIsOpen} />

      <InfoSection />

      {isOpen && (
        <FormSection
          setIsOpen={setIsOpen}
          setSelectedFile={setSelectedFile}
          handleSubmit={handleSubmit}
        >
          <AddPropertyForm
            setSelectedFile={setSelectedFile}
            handleSubmit={handleSubmit}
            errors={errors}
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

function FormSection({ setIsOpen, children }) {
  return (
    <section className="fixed inset-0 flex items-center justify-center z-50">
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

// const validateForm = () => {
//     let newErrors = {};
//     const requiredFields = [
//         "title",
//         "address",
//         "city",
//         "square_meters",
//         "pricePerNight",
//         "n_bedrooms",
//         "n_beds",
//         "n_bathrooms",
//     ];
//     requiredFields.forEach((field) => {
//         if (!formData[field]?.trim()) {
//             newErrors[field] = (
//                 <span className="flex items-center gap-1 text-red-500">
//                     <CgDanger /> Required
//                 </span>
//             );
//         }
//     });
//     if (formData.title && formData.title.length < 10) {
//         newErrors.title = (
//             <span className="flex items-center gap-1 text-red-500">
//                 <CgDanger /> Title must be at least 10 characters
//             </span>
//         );
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
// };
