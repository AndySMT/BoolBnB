import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
    control: () => ({
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
    { value: "casa indipendente", label: "Casa indipendente" },
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
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // todo:slug => usare useSearchParams

    // * ACTIONS
    const onSubmit = (data) => {
        let params = [];
        
        data?.city && params.push(`city=${encodeURIComponent(data.city)}`);
        optSelected?.value &&
            optSelected.value !== "tutti" &&
            params.push(
                `property_type=${encodeURIComponent(optSelected.value)}`
            );
        if (params.length) {
            params = `?${params.join("&")}`;
        } else {
            params = "";
        }
        navigate(`/search${params}`);
        reset();
    };
    return (
        <form
            className={`${formClassName} relative`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className={`flex border-b border-black relative ${inputClassName}`}
            >
                <input
                    className=" px-4 py-2 focus:outline-none"
                    type="text"
                    placeholder="Città"
                    {...register("city")}
                />
            </div>
            <div className={`${selectClassName} relative`}>
                <Select
                    styles={customStyles}
                    options={typeOptions}
                    placeholder="Tipo di casa"
                    isSearchable={false}
                    type="text"
                    onChange={(opt) => setOptSelected(opt)}
                />
            </div>
            <button
                type="submit"
                className={`px-4 py-2 w-full bg-[#7da872] text-white rounded-lg hover:bg-[#688f5f] flex justify-center items-center gap-4 text-2xl cursor-pointer ${btnClassName}`}
            >
                {children}
            </button>
        </form>
    );
}

const schema = yup.object().shape({
    city: yup.string().trim().required(),
});

export default FastPropertySearch;
