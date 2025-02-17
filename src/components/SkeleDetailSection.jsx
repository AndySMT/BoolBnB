function SkeleDetailSection() {
    return (
        <>
            <div className="is-loading grid grid-cols-1 lg:grid-cols-2 gap-10 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-8">
                {/* SECTION IMAGES*/}
                <SectionImages />
                {/* sezione dettaglio */}
                <SectionDetails />
            </div>
            {/* sezione Posizione */}
            <div className="is-loading">
                <SectionPosition />
            </div>
        </>
    );
}

// SECTION IMAGES
function SectionImages() {
    return (
        <>
            {/* sezione immagini mobile */}
            <section className="block sm:hidden p-4">
                <div className="flex image rounded-lg">
                    <div className=" min-w-screen h-[37vh]"></div>
                </div>
            </section>

            {/* immagini desktop e dettaglio */}
            <section className="hidden sm:flex gap-2 aspect-video h-full w-full">
                <div className="image relative">
                    <div className="h-full aspect-video rounded-lg"></div>
                </div>
            </section>
        </>
    );
}

// SECTION DETAILS
function SectionDetails() {
    return (
        <>
            <section className="flex flex-col flex-wrap gap-3 px-3 sm:pt-3">
                <div className="flex items-center gap-4 justify-between">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider">
                        title
                    </h1>
                    <div className="hidden sm:flex gap-2 items-center whitespace-nowrap">
                        {/* <StarsComponent /> */}
                        <div className="flex items-center">
                            {/* icona condividi */}
                            <span className="text-xs underline underline-offset-2">
                                Condividi
                            </span>
                        </div>
                        <button className="flex items-center cursor-pointer">
                            <span className="text-xs underline underline-offset-2">
                                Salva nei Preferiti
                            </span>
                        </button>
                    </div>
                </div>
                {/* Dettagli della proprietà */}
                <p className="font-semibold md:text-lg text-stone-900">
                    description
                </p>

                <span className="sm:text-xl font-bold">Cosa offre:</span>
                <p className="grid grid-cols-2 grid-rows-2 sm:gap-2 text-base text-gray-500 sm:text-lg  border px-4 py-2 rounded-lg whitespace-nowrap">
                    <span className="flex items-center gap-1">Stanze:</span>
                    <span className="flex items-center gap-1">Bagni:</span>
                    <span className="flex items-center gap-1">Letti:</span>
                    <span className="flex items-center gap-1">Superficie:</span>
                </p>
                {/* Amato dagli ospiti */}
                <div className="cursor-pointer mt-3">
                    <button className="rounded-lg flex items-center gap-5 w-fit px-8 py-2 font-semibold">
                        <div className="flex justify-between">
                            <p className="text-center text-xl">
                                Amato <br /> dagli ospiti
                            </p>
                        </div>
                        <p className="text-center">recensioni</p>
                    </button>
                </div>
            </section>
        </>
    );
}

// SECTION POSITION
function SectionPosition() {
    return (
        <>
            <section className="flex flex-col lg:flex-row  items-stretch justify-between gap-12 px-3 sm:px-6 lg:px-12 xl:px-20 m-2 sm:m-6 lg:mx-20 mb-0 pb-6  ">
                {/* Informazioni sulla proprietà */}
                <div className="lg:w-1/2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wide mb-4 ">
                        Posizione
                    </h1>
                    <p className="grid grid-cols-2 grid-rows-2 sm:gap-2  text-gray-500 border px-1 py-2 rounded-lg whitespace-nowrap ">
                        <span className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            citta
                        </span>
                        <span className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            citta
                        </span>
                        <span className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            citta
                        </span>
                        <span className="flex items-center flex-wrap gap-1 text-base sm:text-lg font-semibold">
                            citta
                        </span>
                        
                    </p>
                    <p className="my-6">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Quibusdam ipsa aspernatur corporis error,
                        voluptates excepturi? Veniam reprehenderit provident
                        voluptates animi.
                    </p>
                </div>
                {/* Mappa */}
                <p className="lg:w-1/2 lg:py-8 lg:px-4">ciao</p>
            </section>
        </>
    );
}
export default SkeleDetailSection;
