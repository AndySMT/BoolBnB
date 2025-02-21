import { useState } from "react";

function RevsFilter({ setRevsParams }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("");
    const onFilterBtnClick = (e) => {
        const btnClicked = e.target
        setSelectedFilter(btnClicked.textContent);
        switch (btnClicked.name) {
            case "rating-desc":
                setRevsParams({})
                break;
            case "rating-asc":
                setRevsParams({ asc: "true" })
                break;
            case "data-desc":
                setRevsParams({ data: "true" })
                break;
            case "data-asc":
                setRevsParams({ data: "true", asc: "true" })
                break;
        }
        window.sessionStorage.setItem("newRevsCount", 0);

    }
    const details = <span className="text-[0.5rem]"> ({selectedFilter}) </span>
    return (
        <div onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative py-2">
            {/* icon */}
            <button

                onClick={() => setIsOpen((curr) => !curr)}
                className="text-sm p-2 border rounded-lg cursor-pointer">Ordina per {details}  </button>
            {/* menu */}
            {isOpen && (
                <div className="flex flex-col absolute border bg-[#fcfcfc]/85 rounded-lg w-fit whitespace-nowrap  top-[90%] gap-1 right-0 [&>button]:hover:bg-[#b6cf978c]">
                    <button onClick={onFilterBtnClick} name="rating-desc" className="px-4 py-2 cursor-pointer">Dal più votato</button>

                    <button onClick={onFilterBtnClick} name="rating-asc" className="px-4 py-2 cursor-pointer">Dal meno votato</button>
                    <button onClick={onFilterBtnClick} name="data-desc" className="px-4 py-2 cursor-pointer">Dal più recente</button>
                    <button onClick={onFilterBtnClick} name="data-asc" className="px-4 py-2 cursor-pointer">Dal meno recente</button>
                </div>
            )}
        </div>
    );
}

export default RevsFilter