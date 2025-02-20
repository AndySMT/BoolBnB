import { format } from "date-fns";
import { it } from "date-fns/locale";
import { FaStar } from "react-icons/fa";

function ReviewComponent({ rev }) {
    // Funzione per formattare la data
    const formatDate = (dateString) => {
        const parsedDate = Date.parse(dateString);
        if (isNaN(parsedDate)) {
            return "Data non valida";
        }
        return format(new Date(parsedDate), "dd MMMM yyyy", { locale: it });
    };
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2" key={rev.id}>
            <div key={rev.id} className="review-card boxShad p-2 h-full flex flex-col gap-3">
                <div>
                    <p className="font-medium text-xl">{rev.title}</p>
                    <p className="text-md text-gray-700">{rev.description}</p>
                </div>
                <div className="justify-between flex items-center mt-auto">
                    <p className="text-sm text-gray-500">
                        <span className="flex ml-1">
                            {[...Array(5)].map((_, index) =>
                                index < rev.rating ? (
                                    <FaStar
                                        key={index}
                                        className="text-yellow-500"
                                    />
                                ) : (
                                    <FaStar
                                        key={index}
                                        className="text-stone-300"
                                    />
                                )
                            )}
                        </span>
                    </p>
                    <div className="flex flex-col ">
                        <span className="text-sm text-end">{rev.name}</span>
                        <span className="text-[0.6rem] text-gray-400">
                            {formatDate(rev.create_at)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewComponent;
