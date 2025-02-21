import { useState, useEffect } from "react";

function RevsFilter({ revsParams, setRevsParams }) {
    const [isOpen, setIsOpen] = useState(false);  // per aprire options
    const [selectedFilter, setSelectedFilter] = useState("");  // stringa che memorizza il testo della option selezionata

    // azione che parte al click di una option
    const onFilterBtnClick = (e) => {
        const btnClicked = e.target // option selezionata
        // console.log(btnClicked.innerHTML)
        switch (btnClicked.name) {
            case "rating-desc":
                setRevsParams({ message: btnClicked.innerHTML })
                break;
            case "rating-asc":
                setRevsParams({ asc: "true", message: btnClicked.innerHTML })
                break;
            case "data-desc":
                setRevsParams({ data: "true", message: btnClicked.innerHTML })
                break;
            case "data-asc":
                setRevsParams({ data: "true", asc: "true", message: btnClicked.innerHTML })
                break;
        }
        window.sessionStorage.setItem("newRevsCount", 0);  // per mandare le recensioni nuove ( se ce ne sono) nelle vecchie
    }

    useEffect(() => {
        setSelectedFilter(revsParams?.message || "Più votati") // sincronizzazione opzione selezionata (Piu votati default)
    }, [revsParams])

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative py-2">

            {/* icon */}
            <button
                onClick={() => setIsOpen((curr) => !curr)}
                className="text-sm p-2 border rounded-lg cursor-pointer">
                <span>Ordina per: </span>
                <span className="text-xs">  {selectedFilter} </span>
            </button>

            {/* menu */}
            {isOpen && (
                <div className="flex flex-col absolute border bg-[#fcfcfc]/85 rounded-lg w-fit whitespace-nowrap  top-[90%] gap-1 right-0 [&>button]:hover:bg-[#b6cf978c]">
                    <button onClick={onFilterBtnClick} name="rating-desc" className="text-start pl-2 pr-4 py-2 cursor-pointer">Più votati</button>

                    <button onClick={onFilterBtnClick} name="rating-asc" className="text-start pl-2 pr-4 py-2 cursor-pointer">Meno votati</button>
                    <button onClick={onFilterBtnClick} name="data-desc" className="text-start pl-2 pr-4 py-2 cursor-pointer">Più recenti</button>
                    <button onClick={onFilterBtnClick} name="data-asc" className="text-start pl-2 pr-4 py-2 cursor-pointer">Meno recenti</button>
                </div>
            )}
        </div>
    );
}

export default RevsFilter