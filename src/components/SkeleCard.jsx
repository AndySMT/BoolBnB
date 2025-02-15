function SkeleCard() {
    return (
        <div className="card is-loading">
            <div className="group cursor-pointer">
                {/* Image carousel */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <div className="image w-full h-full bg-red-950 flex items-center justify-center text-white"></div>
                </div>
                {/* location and rating */}
                <div className="flex flex-col gap-1 py-1 text-xl lg:text-base whitespace-nowrap">
                    <div className="flex justify-between items-center  gap-8 text-2xl lg:text-lg">
                        <span className="font-semibold overflow-ellipsis overflow-hidden">
                            title
                        </span>
                        <span className="flex items-center gap-1">
                            total_likes
                        </span>
                    </div>
                    <span className="text-gray-500 text-lg lg:text-sm ">
                        Host
                    </span>

                    {/* details */}
                    <div className="grid grid-cols-2 grid-rows-2 [&>*:nth-child(even)]:justify-end mt-1 gap-1 text-lg text-gray-500 lg:text-sm">
                        <div className=" overflow-hidden overflow-ellipsis">
                            <span>address</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>bedrooms</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>bathrooms</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>smq</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeleCard;
