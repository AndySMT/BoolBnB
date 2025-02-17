function SkeleJumbotron() {
    return (
        <section className="jumbo is-loading md:h-[65vh] lg:h-[80vh] h-[87vh] relative z-30  text-stone-800 text-center lg:text-start flex items-center p-6 px-3 lg:px-[10vw] lg:py-12 justify-center lg:gap-32 lg:[&>div]:w-1/2 rounded-b-4xl">
            <div className="flex flex-col gap-8 items-center md:mx-20 lg:mx-0 lg:items-start">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl md:text-7xl lg:text-6xl tracking-wide font-black">
                        Your Dream Getaway Awaits
                    </h1>
                    <p className="font-black tracking-wide text-xl text-stone-700 md:text-2xl">
                        From cozy cottages to luxurious villas, discover the
                        ideal space for your next adventure
                    </p>
                </div>
                <div className="flex flex-col rounded-lg p-4 text-sm gap-4 shadow-lg">
                    <div className="font-semibold lg:font-light lg:text-base">
                        <span>
                            <span className="underline underline-offset-2">
                                Already Know
                            </span>{" "}
                            What You're Looking For? <br />
                            Your{" "}
                            <strong className="font-semibold">
                                Dream
                            </strong>{" "}
                            Stay is Just{" "}
                            <strong className="font-semibold">
                                One Click Away
                            </strong>
                            !
                        </span>
                    </div>
                    <div className="flex gap-4 whitespace-nowrap text-lg font-semibold tracking-wider lg:tracking-normal">
                        <button className="text-center bg-[#d4c685] py-4 rounded-md w-2/3 border-2 border-stone-500 hover:bg-[#cabc7d] cursor-pointer">
                            Book Now!
                        </button>
                        <button className="bg-[#fefae0] hover:bg-[#faedcd] px-4 py-2 rounded-md cursor-pointer">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 grid-rows-2 h-full">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={`image aspect-[8/9] mx-auto max-h-64`}
                    ></div>
                ))}
            </div>
        </section>
    );
}

export default SkeleJumbotron;
