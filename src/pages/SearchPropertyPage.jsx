import React from 'react'
import { useRef, useEffect } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SearchPropertyPage() {
  const CheckIn = useRef(null);
  const CheckOut = useRef(null);

  //! Funzione che gestisce il cambiamento della data di inizio
  const handleStartDateChange = () => {
    if (CheckIn.current && CheckOut.current) {
      CheckOut.current.min = CheckIn.current.value;
    }
  };

  useEffect(() => {
    //! Impostiamo la data minima per la Data di inizio alla data corrente
    const today = new Date().toISOString().split('T')[0];
    if (CheckIn.current) {
      CheckIn.current.min = today; //? Impostiamo la data minima per la Data di inizio
    }
  }, []);

  // //!impostazioni carosello
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // A 992px, mostra 3 cards
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // A 768px, mostra 2 cards
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540, // A 567px, mostra 1 card
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <form className='flex flex-col md:flex-row mt-5 mx-10 bg-linear-90/oklch  from-[#d4c685] to-[#a7d3a6] justify-around gap-x-8 gap-y-4 px-5 py-4'>
        {/* Place section */}
        <div>
          <label htmlFor="place">Dove</label>
          <select name="place" id="place" className='bg-amber-100 h-12 p-3 w-full'>
            <option value="all">Sono flessibile</option>
            <option value="italy">Italia</option>
            <option value="europe">Europa</option>
            <option value="america">America</option>
          </select>
        </div>
        {/* date section */}
        <div className='grid grid-cols-2 gap-4'>
          {/* date checkIn section */}
          <div>
            <label htmlFor="start-date">Check-In</label>
            <input
              type="date"
              id="start-date"
              ref={CheckIn}
              onChange={handleStartDateChange}
              placeholder='Check-In'
              className='bg-amber-100 h-12 p-3 w-full'
            />
          </div>
          {/* date checkOut section */}
          <div>
            <label htmlFor="end-date">Check-Out</label>
            <input
              type="date"
              id="end-date"
              ref={CheckOut}
              placeholder='Check-Out'
              className='bg-amber-100 h-12 p-3 w-full'
            />
          </div>
        </div>
        {/* # People Section */}
        <div className='md:grid md:grid-cols-3 gap-4 flex flex-col'>
          {/* Children section */}
          <div>
            <label htmlFor="children">Bambini</label>
            <input type="number" name="children" id="children" min={0} className='bg-amber-100 h-12 p-3 w-full' />
          </div>
          {/* Adult Section */}
          <div>
            <label htmlFor="adult">Adulti</label>
            <input type="number" name="adult" id="adult" min={0} className='bg-amber-100 h-12 p-3 w-full' />
          </div>
          {/* Animal section */}
          <div>
            <label htmlFor="animal">Animali</label>
            <input type="number" name="animal" id="animal" min={0} className='bg-amber-100 h-12 p-3 w-full' />
          </div>
        </div>
      </form>

      <div className='bg-linear-90/oklch  from-[#85d4c3] to-[#a6b8d3] mx-10 my-20 md:my-5 py-5'>
        <h2 className='text-center'>Dove vuoi andare</h2>
        <div className='m-4'>
        <Slider {...settings}>
          <div>
            <img src="./regions/flexibility.jpg" alt="earth" className='w-50 aspect-square' />
            <h2>Sono flessibile</h2>
          </div>
          <div>
            <img src="./regions/africa.jpg" alt="africa" className='w-50 aspect-square' />
            <h2>Africa</h2>
          </div>
          <div>
            <img src="./regions/spagna.jpg" alt="spagna" className='w-50  aspect-square' />
            <h2>Spagna</h2>
          </div>
          <div>
            <img src="./regions/sudamerica.jpg" alt="sudamerica" className='w-50 aspect-square ' />
            <h2>Sud America</h2>
          </div>
          <div>
            <img src="./regions/sudestasia.jpg" alt="sudestasia" className='w-50 aspect-square ' />
            <h2>Sud-est Asia</h2>
          </div>
          <div>
            <img src="./regions/usa.jpg" alt="usa" className='w-50 aspect-square ' />
            <h2>USA</h2>
          </div>
          </Slider>
        </div>      
      </div>
    </>

  )
}

export default SearchPropertyPage