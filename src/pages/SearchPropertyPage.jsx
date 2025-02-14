import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { baseUrl, propsEndpoint } from "../globals/apiUrls";

// options delle select iniziali
const initialOptions = {
    n_bathrooms: 0,
    n_beds: 0,
    square_meters: 0,
    n_bedrooms: 0,
    property_type: "",
};
// todo: refactor con react query
function SearchPropertyPage() {
    const [inputValue, setInputValue] = useState(""); // input per ricerca tramite luogo
    const [properties, setProperties] = useState([]); // per salvare risposta proprieta dal server
    // oggetto che salva le options
    const [optSelected, setOptSelected] = useState(initialOptions);
    // filtro in base a input di ricerca luogo
    const filteredProperties = properties?.filter((prop) =>
        prop?.city?.toLowerCase().includes(inputValue.toLowerCase())
    );

    // * ACTIONS
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        const params = optSelected; // le options le indico come params da mettere nella query params
        axios.get(baseUrl + propsEndpoint, { params }).then((res) => {
            setProperties(res.data);
            // al success, reset delle opzioni delle selects
            setOptSelected(initialOptions);
        });
    };

    // * QUERIES
    useEffect(() => {
        // fetch iniziale delle proprieta
        axios
            .get(baseUrl + propsEndpoint)
            .then((res) => setProperties(res.data))
            .catch((err) => console.error(err));
    }, []);

    // * RETURNS
    return (
        <>
            <div className="grid grid-cols-2">
                <div>
                    <input
                        type="text"
                        className="border rounded-lg px-4 py-2 block mx-auto"
                        placeholder="Inserisci città"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <form
                        onSubmit={onSubmit}
                        className="mx-auto my-4 w-1/2 bg-amber-200 min-h-[60vh]"
                    >
                        <Selects setOptSelected={setOptSelected} />
                        {/* submit */}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-amber-500 rounded-lg"
                        >
                            Cerca
                        </button>
                    </form>
                </div>
                <Countries />
            </div>
            {/* data */}
            <div className="bg-green-300 text-center min-h-[200px]">
                {properties.length && inputValue.length ? (
                    filteredProperties.map((prop) => (
                        <div key={prop.id}>{prop.title}</div>
                    ))
                ) : (
                    <p>Nessun risultato ancora</p>
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
    { value: "casa_indipendente", label: "Casa indipendente" },
    { value: "villa_a_schiera", label: "Villa a schiera" },
];

const customStyles = {
    control: () => {}, //style della select
    option: () => {}, //style delle options
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

function Countries() {
    return (
        <div className="bg-radial-[at_25%_25%] from-blue-200 to-blue-300 to-75% mx-10 my-5 md:my-5 py-5 rounded-2xl inset-shadow-[7px_7px_7px_rgba(0,0,0,0.25)]">
            <h2 className="text-center">Dove vuoi andare</h2>{" "}
            <div className="flex gap-4 overflow-scroll mx-5 [&_h2]:text-sm [&_div]:shrink-0 [&_div]:w-40 [&_img]:rounded-xl [&_img]:aspect-square">
                {" "}
                <div>
                    <img src="./regions/flexibility.jpg" alt="earth" />
                    <h2>Sono flessibile</h2>{" "}
                </div>{" "}
                <div>
                    <img src="./regions/africa.jpg" alt="africa" />
                    <h2>Africa</h2>{" "}
                </div>{" "}
                <div>
                    <img src="./regions/spagna.jpg" alt="spagna" />
                    <h2>Spagna</h2>{" "}
                </div>{" "}
                <div>
                    <img src="./regions/sudamerica.jpg" alt="sudamerica" />
                    <h2>Sud America</h2>{" "}
                </div>{" "}
                <div>
                    <img src="./regions/sudestasia.jpg" alt="sudestasia" />
                    <h2>Sud-est Asia</h2>{" "}
                </div>{" "}
                <div>
                    <img src="./regions/usa.jpg" alt="usa" />
                    <h2>USA</h2>{" "}
                </div>{" "}
            </div>{" "}
        </div>
    );
}

export default SearchPropertyPage;
