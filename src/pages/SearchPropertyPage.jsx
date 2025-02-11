import React from 'react'
import { useState } from 'react';
// import { useRef, useEffect } from 'react'
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function SearchPropertyPage() {
  // const CheckIn = useRef(null);
  // const CheckOut = useRef(null);

  // //! Funzione che gestisce il cambiamento della data di inizio
  // const handleStartDateChange = () => {
  //   if (CheckIn.current && CheckOut.current) {
  //     CheckOut.current.min = CheckIn.current.value;
  //   }
  // };

  // useEffect(() => {
  //   //! Impostiamo la data minima per la Data di inizio alla data corrente
  //   const today = new Date().toISOString().split('T')[0];
  //   if (CheckIn.current) {
  //     CheckIn.current.min = today; //? Impostiamo la data minima per la Data di inizio
  //   }
  // }, []);

  // //!impostazioni carosello
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: false,
  //   autoplaySpeed: 1500,
  //   cssEase: "ease-in-out",
  //   pauseOnHover: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024, // A 1024px, mostra 3 cards
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 768, // A 768px, mostra 2 cards
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 540, // A 540px, mostra 1 card
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  //! Utilizza useState per tracciare lo stato "active"
  const [isActive, setIsActive] = useState(false);

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
      <form className='flex flex-col md:flex-row mt-5 mx-10 bg-linear-90/oklch sm:drop-shadow-lg from-15% from-[#a7d3a6] to-[#d4c685] justify-around gap-x-8 gap-y-4 px-5 py-4 [&_label]:text-sm md:[&_label]:text-base [&_input]:bg-[#C6A8E2] [&_input]:rounded-3xl rounded-2xl [&_input]:shadow-[0_7px_7px_rgba(0,0,0,0.25)] inset-shadow-[7px_7px_7px_rgba(0,0,0,0.25)]'>
        {/* Place section */}
        <div>
          <label htmlFor="place">Luogo</label>
          <input type="text" name="place" id="place" className= 'h-12 p-3 w-full' onFocus={handleFocus} 
        onBlur={handleBlur} />
        </div>
        {/*********************date section ************************/}
        {/* <div className='grid grid-cols-2 gap-4'> */}
        {/* date checkIn section */}
        {/* <div>
            <label htmlFor="start-date">Check-In</label>
            <input
              type="date"
              id="start-date"
              ref={CheckIn}
              onChange={handleStartDateChange}
              placeholder='Check-In'
              className='bg-amber-100 h-12 p-3 w-full'
            />
          </div> */}
        {/* date checkOut section */}
        {/* <div>
            <label htmlFor="end-date">Check-Out</label>
            <input
              type="date"
              id="end-date"
              ref={CheckOut}
              placeholder='Check-Out'
              className='bg-amber-100 h-12 p-3 w-full'
            />
          </div> */}
        {/******************** </div> *************************/}
        {/* # mq and property_type section */}
        <div className='grid grid-cols-2 gap-4'>
          {/* property_type section */}
          <div>
            <label htmlFor="property_type">Tipo di proprietà</label>
            <select name="property_type" id="property_type" className='h-12 p-3 w-full bg-[#C6A8E2] rounded-3xl shadow-[0_7px_7px_rgba(0,0,0,0.25)]'>
              <option value="prop">Scegli la proprietà</option>
              <option value="villa">Villa</option>
              <option value="apartment">Appartamento</option>
              <option value="chalet">Chalet</option>
              <option value="cabin">Baita</option>
              <option value="terraced_villa">Villa a Schiera</option>
              <option value="detached_house">Casa indipendente</option>
            </select>
          </div>
          {/* mq section */}
          <div>
            <label htmlFor="surface">Metri quadrati</label>
            <input type="number" name="surface" id="surface" min={0} className='h-12 p-3 w-full' />
          </div>
        </div>
        {/* #rooms */}
        <div className='grid grid-cols-2 gap-4'>
          {/* #bedrooms Section */}
          <div>
            <label htmlFor="bedrooms"># camere</label>
            <input type="number" name="bedrooms" id="bedrooms" min={0} className='h-12 p-3 w-full' />
          </div>
          {/* #bathrooms section */}
          <div>
            <label htmlFor="bathrooms"># bagni</label>
            <input type="number" name="bathrooms" id="bathrooms" min={0} className='h-12 p-3 w-full' />
          </div>
        </div>
      </form>

      {isActive && (
        <div className='bg-radial-[at_25%_25%] from-blue-200 to-blue-300 to-75% mx-10 my-5 md:my-5 py-5 rounded-2xl inset-shadow-[7px_7px_7px_rgba(0,0,0,0.25)]'>
          <h2 className='text-center'>Dove vuoi andare</h2>
          <div className='flex gap-4 overflow-scroll mx-5 [&_h2]:text-sm [&_div]:shrink-0 [&_div]:w-40 [&_img]:rounded-xl '>
            {/* <Slider {...settings}> */}
            <div>
              <img src="./regions/flexibility.jpg" alt="earth" className='aspect-square ' />
              <h2>Sono flessibile</h2>
            </div>
            <div>
              <img src="./regions/africa.jpg" alt="africa" className='aspect-square' />
              <h2>Africa</h2>
            </div>
            <div>
              <img src="./regions/spagna.jpg" alt="spagna" className='aspect-square ' />
              <h2>Spagna</h2>
            </div>
            <div>
              <img src="./regions/sudamerica.jpg" alt="sudamerica" className='aspect-square' />
              <h2>Sud America</h2>
            </div>
            <div>
              <img src="./regions/sudestasia.jpg" alt="sudestasia" className='aspect-square ' />
              <h2>Sud-est Asia</h2>
            </div>
            <div>
              <img src="./regions/usa.jpg" alt="usa" className='aspect-square' />
              <h2>USA</h2>
            </div>
            {/* </Slider> */}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchPropertyPage