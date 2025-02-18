import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const customStyles = {
    dropdownIndicator: (base) => ({
        ...base,
        color: "gray", // cambia colore dell'icona
        ":hover": {
            color: "black",
        },
    }),
    control: (provided) => ({
        display: "flex",
        textAlign: "start",
        paddingInline: "4px",
        paddingBlock: "4px",
        border: "none",
        borderBottom: "1px solid black",
        borderRadius: "0",
    }), //style della select
    option: (provided, state) => ({
        ...provided,
        paddingBlock: "4px",
        paddingInline: "8px",
        backgroundColor: `${state.isSelected ? "#7da872" : ""}`,
        ":hover": {
            backgroundColor: `${!state.isSelected ? "#badab3" : ""}`,
        },
    }), //style delle options
    placeholder: (provided) => ({
        ...provided,
        color: "#7d7555",
    }),
};

const typeOptions = [
    { value: "tutti", label: "Tutto" },
    { value: "villa", label: "Villa" },
    { value: "appartamento", label: "Appartamento" },
    { value: "chalet", label: "Chalet" },
    { value: "baita", label: "Baita" },
    { value: "attico", label: "Attico" },
    { value: "casa_indipendente", label: "Casa indipendente" },
    { value: "villetta a schiera", label: "Villa a schiera" },
];

function FastPropertySearch({
    formClassName,
    inputClassName,
    selectClassName,
    btnClassName,
    children,
}) {
    const [optSelected, setOptSelected] = useState({});

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const [input] = e.target.elements;
        navigate("/search", {
            state: {
                city: input.value,
                type: optSelected.value !== "tutti" ? optSelected.value : "",
            },
        });
    };
    return (
        <form className={formClassName} onSubmit={onSubmit}>
            <input
                type="text"
                className={`border-b border-black px-4 py-2 focus:outline-none ${inputClassName}`}
                placeholder="Città"
            />
            <Select
                styles={customStyles}
                options={typeOptions}
                placeholder="Tipo di casa"
                isSearchable={false}
                type="text"
                onChange={(opt) => setOptSelected(opt)}
                className={` ${selectClassName}`}
            />
            <button
                type="submit"
                className={`px-4 py-2 w-full bg-[#7da872] text-white rounded-lg hover:bg-[#688f5f] flex justify-center items-center gap-4 text-2xl ${btnClassName}`}
            >
                {children}
            </button>
        </form>
    );
}

export default FastPropertySearch;
