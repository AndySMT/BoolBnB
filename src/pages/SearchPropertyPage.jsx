import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useGetPropertiesQuery } from "../hooks/useDataQuery";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card";
import { useRefsContext } from "../Context/RefsContext";

// options delle select iniziali
const initialOptions = {
    n_bathrooms: 0,
    n_beds: 0,
    square_meters: 0,
    n_bedrooms: 0,
    property_type: "",
};

function SearchPropertyPage() {
    const [inputValue, setInputValue] = useState(""); // controllo dinamico dell'input della citta
    const [params, setParams] = useState({}); // per salvare l'oggetto params per la query in get
    const [isEnabled, setIsEnabled] = useState(false); // booleano che abilita o no il fetch (controllare useGetPropertiesQuery)
    const [optSelected, setOptSelected] = useState(initialOptions); // oggetto che salva le options

    const { data, isLoading, isError, isSuccess, refetch } =
        useGetPropertiesQuery(params, isEnabled);

    useEffect(() => {
        if (isSuccess) {
            window.scrollTo({
                behavior: "smooth",
                left: 0,
                top: 600,
            });
        }
    }, [isSuccess]);

    // * ACTIONS
    const onInputSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length) {
            setParams((curr) => ({ ...curr, city: inputValue })); //setto i params in modo tale che arrivino nel formato corretto nel server
            setInputValue(inputValue);
            setIsEnabled(true); // dal submit in poi della prima ricerca, abilito il fetch
            refetch(); // rifai il fetch delle properties
        }
    };

    const onFilterSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length) {
            const params = optSelected; // le options le indico come params da mettere nella query params
            setParams({ city: inputValue, ...params }); //setto i params in modo tale che arrivino nel formato corretto nel server
            refetch();
        } else {
            console.log("Cerca prima la città!");
        }
    };
    // * RETURNS
    return (
        <>
            <div className="grid grid-cols-1  px-6 md:px-24 mt-6">
                <form
                    onSubmit={onInputSubmit}
                    className="flex justify-center gap-2 my-5 md:items-baseline"
                >
                    <input
                        type="text"
                        className="border rounded-lg px-4 py-2 lg:w-100"
                        placeholder="Inserisci città"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg cursor-pointer border border-black active:border-white active:bg-black active:text-white "
                    >
                        Cerca
                    </button>
                </form>

                <form
                    onSubmit={onFilterSubmit}
                    className="my-3 mx-auto p-6 bg-white rounded-3xl inset-shadow-[0px_0px_7px_3px_rgba(0,0,0,0.35)] lg:w-1/2 sm:w-3/4"
                >
                    <Selects setOptSelected={setOptSelected} />
                    {/* submit */}
                    <button
                        disabled={!isEnabled || !inputValue.length}
                        type="submit"
                        className={`${(!isEnabled || !inputValue.length) &&
                            "!cursor-not-allowed opacity-50"
                            } px-4 py-2 my-4 md:mx-0 rounded-lg cursor-pointer mx-15 border border-black active:border-white active:bg-black active:text-white`}
                    >
                        Applica filtri
                    </button>
                </form>
            </div>
            <div className="px-6 md:px-6 mt-6">
                {/* data */}
                {!data?.results ? (
                    <p>Nessun risultato ancora</p>
                ) : isLoading ? (
                    <div>is loading...</div>
                ) : isError ? (
                    <pre>error</pre>
                ) : (
                    <CardsSection title={""}>
                        {data.results.map((prop) => (
                            <Card key={prop.id} property={prop} />
                        ))}
                    </CardsSection>
                )}
            </div>
        </>
    );
}

const options = [
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5+" },
];

const smqOptions = [
    { value: "50", label: "50+" },
    { value: "100", label: "100+" },
    { value: "200", label: "200+" },
    { value: "300", label: "300+" },
    { value: "400", label: "400+" },
];

const typeOptions = [
    { value: "villa", label: "Villa" },
    { value: "appartamento", label: "Appartamento" },
    { value: "chalet", label: "Chalet" },
    { value: "baita", label: "Baita" },
    { value: "attico", label: "Attico" },
    { value: "casa_indipendente", label: "Casa indipendente" },
    { value: "villetta a schiera", label: "Villa a schiera" },
];

const customStyles = {
    control: () => { }, //style della select
    option: () => { }, //style delle options
};

const selectFields = [
    {
        label: "Camere da letto",
        id: "camere_letto",
        field: "n_bedrooms",
        options: options,
    },
    { label: "Letti", id: "letti", field: "n_beds", options: options },
    { label: "Bagni", id: "bagni", field: "n_bathrooms", options: options },
    {
        label: "Metri quadri",
        id: "smq",
        field: "square_meters",
        options: smqOptions,
    },
    {
        label: "Tipo di proprietà",
        id: "p_type",
        field: "property_type",
        options: typeOptions,
    },
];

const Selects = ({ setOptSelected }) => {
    return (
        <>
            {selectFields.map(({ label, id, field, options }) => (
                <div key={id}>
                    <label htmlFor={id}>{label}</label>
                    <Select
                        id={id}
                        name={id}
                        options={options}
                        onChange={(opt) =>
                            setOptSelected((prev) => ({
                                ...prev,
                                [field]: opt.value,
                            }))
                        }
                    />
                </div>
            ))}
        </>
    );
};

export default SearchPropertyPage;
