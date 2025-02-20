import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useInfiniteGetPropsQuery } from "../hooks/useDataQuery";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRefsContext } from "../Context/RefsContext";
import SkeleCard from "../components/SkeleCard";
import LoadMoreButton from "../components/LoadMoreButton";
import { Fragment } from "react";
import { Listbox } from "@headlessui/react";

// options delle select iniziali
const initialOptions = {
    n_bathrooms: 0,
    n_beds: 0,
    square_meters: 0,
    n_bedrooms: 0,
    property_type: "",
};

function SearchPropertyPage() {
    const { headerRef } = useRefsContext();

    const [searchParams] = useSearchParams();
    const paramsObj = Object.fromEntries(searchParams.entries());
    console.log(paramsObj)
    const city = searchParams.get("city"); // prendo il parametro city dalla query della url
    const property_type = searchParams.get("property_type"); // prendo il parametro property_type dalla query della url

    const [inputValue, setInputValue] = useState(city ? city : ""); // controllo dinamico dell'input della citta

    const [params, setParams] = useState(paramsObj); // per salvare l'oggetto params per la query in get
    const [optSelected, setOptSelected] = useState(initialOptions); // oggetto che salva le options
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [currPage, setCurrPage] = useState(1);

    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        refetch,
        data,
        fetchNextPage,
        isFetchingNextPage,
        isFetched,
    } = useInfiniteGetPropsQuery(params);

    useEffect(() => {
        // vai giu dopo il fetch e se sei dal 2 fetch in poi
        if (currPage > 1 && isFetched) {
            window.scroll({
                left: 0,
                top: document.documentElement.scrollTop + 600, // ? offset da calcolare invece con l'altezza della card (useRefsContext)
                behavior: "smooth",
            });
        }
    }, [currPage]);

    // Ricarica i dati ogni volta che i parametri cambiano
    useEffect(() => {
        refetch();
    }, [params]);

    // * ACTIONS
    const onInputSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length) {
            setParams((curr) => ({ ...curr, city: inputValue })); //setto i params in modo tale che arrivino nel formato corretto nel server
            setInputValue(inputValue);
            navigate(`/search?city=${encodeURIComponent(inputValue)}`);
        }
        setIsFilterOpen(false);
    };

    const onFilterSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length) {
            let optParams = Object.fromEntries(
                Object.entries(optSelected).filter(([_, value]) => Boolean(value))
            ); // le options non falsy le indico come params da mettere nella query params
            let paramsObj = { city: inputValue, ...optParams };
            setParams(paramsObj); //setto i params in modo tale che arrivino nel formato corretto nel server
            refetch();
            let paramsArr = Object.entries(paramsObj).map(([key, value]) => `${key}=${value}`);
            paramsArr = `?${paramsArr.join("&")}`;
            navigate(`/search${paramsArr}`);
        } else {
            console.log("Cerca prima la città!");
        }
        setIsFilterOpen(false);
    };

    const headerHeight = headerRef?.current?.offsetHeight - 2;

    const style = { top: `${headerHeight}px` };

    if (isError) navigate("/lost");
    // * RETURNS
    return (
        <>
            <div
                style={style}
                className="flex items-center justify-center gap-8 border-b bg-[#fcfcfc] px-6 md:px-24 sticky top-14 left-0 w-screen z-30"
            >
                <form
                    onSubmit={onInputSubmit}
                    className="flex justify-center gap-1 my-4 md:items-baseline"
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
                        <FaSearch className="md:hidden" />
                        <p className="hidden md:block">Cerca</p>
                    </button>
                </form>
                <button
                    onClick={() => setIsFilterOpen((curr) => !curr)}
                    className="text-xl p-3 rounded-md border lg:hidden"
                >
                    <FaFilter />
                </button>
                <div
                    className={`${!isFilterOpen && "hidden lg:block"
                        } bg-white absolute w-full lg:h-screen z-30 top-[102%] lg:w-1/6 right-0`}
                >
                    <form
                        onSubmit={onFilterSubmit}
                        className=" md:w-full px-6 py-2 grid grid-cols-2 gap-4 md:text-[10px] z-20 sm:grid-cols-3 lg:grid-cols-1 items-end"
                    >
                        <Selects setOptSelected={setOptSelected} />
                        <button
                            disabled={!inputValue.length}
                            type="submit"
                            className={`${!inputValue.length &&
                                "!cursor-not-allowed opacity-50"
                                } px-4 md:py-3 py-2 md:mx-0 rounded-lg cursor-pointer mx-2 border border-black active:border-white active:bg-black active:text-white`}
                        >
                            Applica filtri
                        </button>
                        <button
                            disabled={!inputValue.length}
                            type="reset"
                            className={`${!inputValue.length &&
                                "!cursor-not-allowed opacity-50"
                                } px-4 md:py-3 py-2 md:mx-0 rounded-lg cursor-pointer mx-2 border border-black active:border-white active:bg-black active:text-white`}
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>
            <div className="p-6 pt-14 lg:px-12 lg:w-5/6">
                {/* data */}
                <>
                    {data?.pages[0]?.total_quantity === 0 ? (
                        // Nessun risultato
                        <h2>La tua ricerca non ha prodotto nessun risultato</h2>
                    ) : isFetchingNextPage || isLoading ? (
                        // Skeleton loading
                        <CardsSection classes="lg:!px-0 !pt-0" title="">
                            <>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <SkeleCard key={index} />
                                ))}
                            </>
                        </CardsSection>
                    ) : (
                        // Paginazione
                        <CardsSection classes="lg:!px-0 !pt-0" title="">
                            <>
                                {data?.pages.map((group, i) => (
                                    <Fragment key={i}>
                                        {group?.results?.map((prop, index) => (
                                            <Card key={prop.id} property={prop} index={index} />
                                        ))}
                                    </Fragment>
                                ))}
                            </>
                        </CardsSection>
                    )}


                    {/* Load More Btn */}
                    {data?.pages[data?.pages.length - 1]?.total_res >= 4 && (
                        <div className="flex justify-center">
                            <LoadMoreButton
                                noMore={false}
                                // al click fetcha la prossima pagina e setta la prossima pagina
                                onClick={() => {
                                    fetchNextPage();
                                    setCurrPage((curr) => curr + 1);
                                }}
                            />
                        </div>
                    )}
                </>
            </div>
        </>
    );
}

const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
];

const smqOptions = [
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "300", label: "300" },
    { value: "400", label: "400" },
    { value: "500", label: "500" },
    { value: "600", label: "600" },
    { value: "700", label: "700+" },
];

const bathOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3+" },
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
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: state.isFocused ? "black" : "grey",
        borderRadius: "10px",
    }), //style della select
    option: (styles, state) => {
        const backgroundColor = state.isFocused ? "black" : "white";

        return {
            ...styles,
            backgroundColor: backgroundColor,
            color: state.isFocused ? "white" : "black",
            borderRadius: "5px",
        };
    }, //style delle options
};

const selectFields = [
    {
        label: "Camere da letto",
        id: "camere_letto",
        field: "n_bedrooms",
        options: options,
    },
    { label: "Letti", id: "letti", field: "n_beds", options: options },
    { label: "Bagni", id: "bagni", field: "n_bathrooms", options: bathOptions },
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
                        placeholder={
                            label == "Tipo di proprietà"
                                ? "Proprietà"
                                : "Inserisci"
                        }
                        styles={customStyles}
                        onChange={(opt) => opt.value && setOptSelected((prev) => ({
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
