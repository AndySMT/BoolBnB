import React from "react";
import { useState } from "react";
import AddPropertyForm from "../components/AddPropertyForm";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import MyMapComponent from "../components/MapComponent";
import { useRefsContext } from "../Context/RefsContext";
import { useNavigate } from "react-router-dom";

function AddPropertyPage() {
  /*  const [isFormOpen, setIsFormOpen] = useState(false); */
  const navigate = useNavigate();

  const goToFormPage = () => {
    navigate("/add-your-property-form");
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection goToFormPage={goToFormPage} />

      <InfoSection />

      <InfoSection2 />

      {/* {isFormOpen && (
                <FormSection setIsFormOpen={setIsFormOpen}>
                    <AddPropertyForm setIsFormOpen={setIsFormOpen} />
                </FormSection>
            )} */}
    </>
  );
}

function HeroSection({ goToFormPage }) {
  const { headerRef } = useRefsContext();
  const [range, setRange] = useState(16);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const headerHeight = !headerRef?.current?.offsetHeight || headerRef?.current?.offsetHeight === 0 ? 56 : headerRef.current.offsetHeight;

  const style = {
    marginTop: `${headerHeight}px`,
  };
  return (
    <section style={style} className="p-8 sm:p-12 lg:px-24">
      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 justify-center items-center rounded-lg">
        {/* Testo */}
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className=" text-gray-700 text-4xl font-bold leading-tight text-center">
            Apri il tuo{" "}
            <span className="text-red-600">BoolBnB</span>
            <br />
            potresti <br />
            guadagnare <br />
            fino a <br />
            <span className="text-black">
              {(range * 56.12).toFixed(2)}€
            </span>
          </h1>

          <div className="flex flex-col items-center md:items-start relative w-5/6 ">
            <div className="relative w-full">
              {/* Tooltip */}
              {showTooltip && (
                <div
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-md"
                  style={{ left: `${(range / 30) * 100}%` }} // Posizione dinamica
                >
                  {range} {range == 1 ? "notte" : "notti"}
                </div>
              )}

              {/* Input Range */}
              <input
                type="range"
                className="w-full cursor-pointer custom-range"
                min={1}
                max={30}
                value={range}
                onChange={handleRangeChange}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onMouseDown={() => setShowTooltip(true)}
                onMouseUp={() => setShowTooltip(false)}
              />
            </div>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-2xl cursor-pointer text-white py-3 px-6 rounded-lg shadow-md transition-all"
            onClick={goToFormPage}
          >
            💵 Apri il tuo BnB
          </button>
        </div>

        {/* Immagine / Mappa */}
        <div className="w-full  h-full">
          <MyMapComponent />
        </div>
      </div>
    </section>
  );
}

function InfoSection() {
  return (
    <section className="gap-8 grid grid-cols-1 md:grid-cols-2 p-8 sm:p-12 lg:px-24">
      <div>
        <img
          src="https://images.unsplash.com/photo-1549923746-9507eec27243?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-900 text-center ">
          Con BoolBnB, affittare la tua casa è facile e sicuro
        </h2>
      </div>
      <p className="md:col-span-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur cumque
        labore facilis ipsam illum assumenda quidem nisi? Pariatur, excepturi.
        Omnis ipsam autem officia dolor perferendis. Reiciendis aut cumque earum
        molestias nulla eveniet id corrupti quis sunt nihil laudantium
        blanditiis sint enim, quo omnis dicta esse! Facere voluptates cupiditate
        veniam sapiente, porro eligendi, exercitationem soluta esse, asperiores
        enim quae ipsum repudiandae eos. Nemo, opti
      </p>
    </section>
  );
}
function InfoSection2() {
  return (
    <section className="p-8 sm:p-12 lg:px-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Pubblica il tuo annuncio con BoolBnB e approfitta dei nostri servizi
        </h1>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-900">
              <th className="p-4 text-left text-lg">Servizi</th>
              <th className="p-4 text-center text-lg">BoolBnB</th>
              <th className="p-4 text-center text-lg">Competitors</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                servizio: "Verifica dell'identità dell'ospite",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Controllo delle prenotazioni",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Protezione danni fino a 3.000.000 EUR",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Open di chiave e oggetti di valore",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Vettura e attrezzature",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Danni causati dagli animali domestici",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Perdita di reddito",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Pulizia approfondita",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio:
                  "Assicurazione di responsabilità civile fino a 1.000.000 EUR",
                boolbnb: true,
                competitors: false,
              },
              {
                servizio: "Supporto sicurezza H24",
                boolbnb: true,
                competitors: false,
              },
            ].map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-4 font-medium text-gray-700 text-left align-middle">
                  {item.servizio}
                </td>
                <td className="p-4 text-center align-middle">
                  {item.boolbnb ? (
                    <FaCheck size={20} className="text-green-600 mx-auto" />
                  ) : (
                    <IoClose size={20} className="text-red-600 mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center align-middle">
                  {item.competitors ? (
                    <FaCheck size={20} className="text-green-600 mx-auto" />
                  ) : (
                    <IoClose size={20} className="text-red-600 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FormSection({ children, setIsFormOpen }) {
  const navigate = useNavigate();
  const goToFormPage = () => {
    navigate("/insert");
  };
  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 px-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={goToFormPage}
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
