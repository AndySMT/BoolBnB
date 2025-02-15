import React, { useEffect, useState, memo, Fragment } from "react";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card";
import {
    useGetPropertiesQuery,
    useInfiniteGetPropsQuery,
} from "../hooks/useDataQuery";
import { useRefsContext } from "../Context/RefsContext";
import SkeleCard from "../components/SkeleCard";
import { useNavigate } from "react-router-dom";
import LoadMoreButton from "../components/LoadMoreButton";

function HomePage() {
    // Stato per i parametri di filtro
    const [params, setParams] = useState({});

    return (
        <>
            {/* Sezione di filtro */}
            <FilterSection setParams={setParams} />
            {/* Container per far rerenderizzare solo CardsSection */}
            <CardsSectionContainer params={params} />
        </>
    );
}

// todo: modificare risposta dal server per ricavare numero totale di risultati
const CardsSectionContainer = ({ params }) => {
    const {
        isLoading,
        isFetchingNextPage,
        isFetched,
        isError,
        data,
        fetchNextPage,
        refetch,
    } = useInfiniteGetPropsQuery(params, true);

    const navigate = useNavigate();

    const [currPage, setCurrPage] = useState(1);

    // Ricarica i dati ogni volta che i parametri cambiano
    useEffect(() => {
        refetch();
    }, [params]);

    useEffect(() => {
        // vai giu dopo il fetch e se sei dal 2 fetch in poi
        if (currPage > 1 && isFetched) {
            window.scroll({
                left: 0,
                top: document.documentElement.offsetHeight + 400,
                behavior: "smooth",
            });
        }
    }, [currPage]);

    // Gestione dello stato di caricamento e errore
    if (isError) {
        navigate("*");
    }
    return (
        <>
            <CardsSection title={""}>
                <>
                    {/* paginazione */}
                    {data?.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group?.map((prop, index) => (
                                <Card
                                    key={prop.id}
                                    property={prop}
                                    index={index}
                                />
                            ))}
                        </Fragment>
                    ))}
                    {/* Skeleton durante il fetch */}
                    {(isFetchingNextPage || isLoading) && (
                        <>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <SkeleCard key={index} />
                            ))}
                        </>
                    )}
                </>
            </CardsSection>
            <div className="flex justify-center">
                <LoadMoreButton
                    // al click fetcha la prossima pagina e setta la prossima pagina
                    onClick={() => {
                        fetchNextPage();
                        setCurrPage((curr) => curr + 1);
                    }}
                />
            </div>
        </>
    );
};

function FilterSection({ setParams }) {
    const { headerRef, jumboRef } = useRefsContext();

    // Stato per il filtro attivo
    const [activeFilter, setActiveFilter] = useState(null);

    // Lista dei tipi di proprietà per il filtro
    const filters = [
        { tutti: "tutti" },
        { baita: "baita" },
        { "villetta a schiera": "schiera" },
        { "casa indipendente": "indipendente" },
        { villa: "villa" },
        { appartamento: "appartamento" },
        { attico: "chalet" },
    ];

    // Funzione per applicare un filtro
    const handleFilterClick = (type) => {
        setParams({ property_type: type === "tutti" ? "" : type });
        setActiveFilter(type);
        window.scrollTo({
            top: jumboRef.current.offsetHeight + headerRef.current.offsetHeight,
            behavior: "smooth",
        });
    };

    return (
        <div className="border-b p-3 bg-white w-screen border-gray-300 fixed md:sticky top-[-1px] sm:top-20 z-20 rounded-b-2xl">
            <div className="overflow-x-auto">
                <div className="flex justify-center gap-10 min-w-max px-2 [&>div]:w-[40px]">
                    {/* Mappa dei filtri e applicazione del filtro selezionato */}
                    {filters.map((filter) => (
                        <div
                            key={Object.keys(filter)[0]}
                            className={`group flex flex-col items-center gap-2 hover:cursor-pointer ${
                                activeFilter === Object.keys(filter)[0]
                                    ? "opacity-100"
                                    : "opacity-50"
                            }`}
                            onClick={() =>
                                handleFilterClick(Object.keys(filter)[0])
                            }
                        >
                            <img
                                src={`/filter_imgs/${
                                    Object.values(filter)[0]
                                }.png`}
                                alt={Object.values(filter)[0]}
                                className="w-6 h-6 group-hover:opacity-100"
                            />
                            <span className="text-xs text-gray-600 group-hover:opacity-100">
                                {Object.values(filter)[0]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
