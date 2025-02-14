import React from 'react'
import { useState } from 'react';
import { useGetPropertiesQuery } from "../hooks/useDataQuery";
// import { useRef, useEffect } from 'react'

function SearchPropertyPage() {
  const { isLoading, isError, data } = useGetPropertiesQuery();
  // const [activeFilter, setActiveFilter] = useState(null);
  //! Utilizza useState per tracciare lo stato "active"
  const [isActive, setIsActive] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <pre>Error</pre>;


  //! Funzione per gestire l'evento di focus sull'input
  const handleFocus = () => {
    setIsActive(true); //? Attiva lo stato quando l'input ha focus
  };

  //! Funzione per gestire l'evento di blur ovvero quando perde il focus
  const handleBlur = () => {
    setIsActive(false);  //? Disattiva lo stato quando l'input perde il focus
  };

  return (
    <>
      <form
        className='flex flex-col md:flex-row mt-5 mx-10 bg-linear-90/oklch sm:drop-shadow-lg from-15% from-[#cccccc] to-[#b7b7b7] justify-around gap-x-8 gap-y-4 px-5 py-4 [&_label]:text-sm [&_input]:bg-[#e2e2e2] [&_input]:rounded-3xl rounded-2xl [&_input]:shadow-[0_7px_7px_rgba(0,0,0,0.25)] inset-shadow-[7px_7px_7px_rgba(0,0,0,0.25)] [&_input]:focus:outline-none'
      >
        {/* Place section */}
        <div>
          <label htmlFor="place">Luogo</label>
          <input type="text" name="place" id="place" className='h-12 p-3 w-full' onFocus={handleFocus}
            onBlur={handleBlur} />
        </div>
        {/* # mq and property_type section */}
        <div className='grid grid-cols-2 gap-4'>
          {/* property_type section */}
          <div>
            <label htmlFor="propriety_type">Tipo di proprietà</label>
            <select name='propriety_type' id='propriety_type' className='h-12 p-3 w-full bg-[#e2e2e2] rounded-3xl shadow-[0_7px_7px_rgba(0,0,0,0.25)] focus:outline-none'>
              <option value="prop">Scegli la proprietà</option>
              <option value="villa">Villa</option>
              <option value="appartamento">Appartamento</option>
              <option value="chalet">Chalet</option>
              <option value="baita">Baita</option>
              <option value="casa_indipendente">Casa indipendente</option>
              <option value="villa_a_schiera">Villa a schiera</option>
            </select>
          </div>
          {/* mq section */}
          <div>
            <label htmlFor="surface">Metri quadrati</label>
            <select name='surface' id='surface' className='h-12 p-3 w-full bg-[#e2e2e2] rounded-3xl shadow-[0_7px_7px_rgba(0,0,0,0.25)] focus:outline-none'>
              <option value="metri">Metri quadrati</option>
              <option value="0">0+</option>
              <option value="50">50+</option>
              <option value="100">100+</option>
              <option value="150">150+</option>
              <option value="200">200+</option>
              <option value="250">250+</option>
            </select>
          </div>
        </div>

        {/* #rooms */}
        <div className='grid grid-cols-3 gap-4'>
          {/* #bedrooms Section */}
          <div>
            <label htmlFor="bedrooms"># camere</label>
            <select name='bedrooms' id='bedrooms' className='h-12 p-3 w-full bg-[#e2e2e2] rounded-3xl shadow-[0_7px_7px_rgba(0,0,0,0.25)] focus:outline-none'>
              <option value="camere"># camere</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          {/* #bathrooms section */}
          <div>
            <label htmlFor="bathrooms"># bagni</label>
            <select name='bathrooms' id='bathrooms' className='h-12 p-3 w-full bg-[#e2e2e2] rounded-3xl shadow-[0_7px_7px_rgba(0,0,0,0.25)] focus:outline-none'>
              <option value="camere"># bagni</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div className='relative'>
            <input type="submit" value="Invia" className='p-3 absolute left-0 bottom-0' />
          </div>
        </div>
      </form>

      {isActive && (
        <div className='bg-radial-[at_25%_25%] from-blue-200 to-blue-300 to-75% mx-10 my-5 md:my-5 py-5 rounded-2xl inset-shadow-[7px_7px_7px_rgba(0,0,0,0.25)]'>
          <h2 className='text-center'>Dove vuoi andare</h2>
          <div className='flex gap-4 overflow-scroll mx-5 [&_h2]:text-sm [&_div]:shrink-0 [&_div]:w-40 [&_img]:rounded-xl [&_img]:aspect-square'>
            <div>
              <img src="./regions/flexibility.jpg" alt="earth" />
              <h2>Sono flessibile</h2>
            </div>
            <div>
              <img src="./regions/africa.jpg" alt="africa" />
              <h2>Africa</h2>
            </div>
            <div>
              <img src="./regions/spagna.jpg" alt="spagna" />
              <h2>Spagna</h2>
            </div>
            <div>
              <img src="./regions/sudamerica.jpg" alt="sudamerica" />
              <h2>Sud America</h2>
            </div>
            <div>
              <img src="./regions/sudestasia.jpg" alt="sudestasia" />
              <h2>Sud-est Asia</h2>
            </div>
            <div>
              <img src="./regions/usa.jpg" alt="usa" />
              <h2>USA</h2>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchPropertyPage