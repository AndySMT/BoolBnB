function SkeleFavourites() {
    return (
        <>
            {[...Array(2)].map((_, i) =>
                <SkeleFavCard key={i} />
            )}
        </>
    )
}

function SkeleFavCard() {
    return (<div className="is-loading flex flex-col md:flex-row lg:flex-row gap-4 shadow-2xl rounded-2xl pb-3 mx-12 mt-16">
        {/* Slider di immagini */}
        <div className="image rounded-3xl relative w-full aspect-square p-2 overflow-hidden">
            SPAZIO PER IMMAGINE
        </div>

        {/* Dettagli della proprietà */}
        <section className="flex flex-col justify-center flex-wrap items-start gap-3 px-3 sm:pt-3 w-full">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-wider">
                title
            </p>
            <p className="font-semibold md:text-lg text-stone-900">
                description
            </p>

            {/* Box "Cosa offre" nascosto su mobile */}
            <div className="">
                <span className="sm:text-xl font-bold">Cosa offre:</span>
                <div
                    className="mt-1 grid grid-cols-2 grid-rows-2 sm:gap-y-2 text-base text-gray-500 sm:text-base px-4 py-2 rounded-lg whitespace-nowrap w-full sm:w-auto"
                >
                    <span className="flex items-center gap-1">
                        Stanze:
                    </span>
                    <span className="flex items-center gap-1">
                        Bagni:
                    </span>
                    <span className="flex items-center gap-1">
                        Letti:
                    </span>
                    <span className="flex items-center gap-1">
                        Superficie:
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-4 lg:justify-center items-center  text-white">
                <button
                    className="bg-red-700 hover:bg-red-800 group rounded-xl px-10 py-5 flex justify-center items-center gap-2 max-h-[50px]  cursor-pointer hover:border-red-400 transition-all duration-300 ease-in-out"
                >

                    <span>Elimina</span>
                </button>
                <button
                    className="group flex gap-2 justify-center items-center relative px-10 py-4 max-h-[50px] rounded-xl bg-[#71904f] hover:bg-[#617f41] transition-all ease-in-out"
                >
                    <span>Dettaglio</span>
                </button>
            </div>
        </section>
    </div>)
}

export default SkeleFavourites