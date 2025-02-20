import React, { useEffect, useState, Fragment } from "react";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card";
import { useInfiniteGetPropsQuery } from "../hooks/useDataQuery";
import { useRefsContext } from "../Context/RefsContext";
import SkeleCard from "../components/SkeleCard";
import { useNavigate } from "react-router-dom";
import LoadMoreButton from "../components/LoadMoreButton";
import { motion } from "framer-motion";

function HomePage() {
    // Stato per i parametri di filtro
    const [params, setParams] = useState({});
    // Stato per il numero di proprietà visualizzate
    const [propsCount, setPropsCount] = useState(4); // ? numero di proprietà per pagina

    return (
        <>
            {/* Sezione di filtro */}
            <FilterSection setParams={setParams} setPropsCount={setPropsCount} />
            {/* Container per far rerenderizzare solo CardsSection */}
            <CardsSectionContainer params={params} propsCount={propsCount} setPropsCount={setPropsCount} />
        </>
    );
}

const CardsSectionContainer = ({ params, propsCount, setPropsCount }) => {
    const {
        isLoading,
        isFetchingNextPage,
        isFetched,
        isError,
        data,
        fetchNextPage,
        refetch,
    } = useInfiniteGetPropsQuery(params);

    const navigate = useNavigate();

    // Ricarica i dati ogni volta che i parametri cambiano
    useEffect(() => {
        refetch();
    }, [params]);

    useEffect(() => {
        // vai giu dopo il fetch e se sei dal 2 fetch in poi
        if (propsCount > 4 && isFetched) {
            window.scroll({
                left: 0,
                top: document.documentElement.scrollTop + 600, // ? offset da calcolare invece con l'altezza della card (useRefsContext)
                behavior: "smooth",
            });
        }
    }, [propsCount]);

    // Gestione dello stato di caricamento e errore
    if (isError) {
        navigate("/lost");
    }
    return (
        <>
            <CardsSection title={"I Preferiti Degli Ospiti"}>
                <>
                    {/* paginazione */}
                    {data?.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group?.results?.map((prop, index) => (
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
                            {Array.from({ length: 4 }).map((_, index) => (
                                <SkeleCard key={index} />
                            ))}
                        </>
                    )}
                </>
            </CardsSection>
            {propsCount < data?.pages[0].total_quantity && (
                <div className="flex justify-center">
                    <LoadMoreButton
                        noMore={false}
                        // al click fetcha la prossima pagina e setta la prossima pagina
                        onClick={() => {
                            fetchNextPage();
                            setPropsCount(curr => curr + 4)
                        }}
                    />
                </div>
            )}
        </>
    );
};

function FilterSection({ setParams, setPropsCount }) {
    const { headerRef, jumboRef, filterRef } = useRefsContext();

    // Stato per il filtro attivo
    const [activeFilter, setActiveFilter] = useState(0);

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
    const handleFilterClick = (type, index) => {
        setPropsCount(4);
        setParams({ property_type: type === "tutti" ? "" : type });
        setActiveFilter(index);
        window.scrollTo({
            top: jumboRef.current.offsetHeight + headerRef.current.offsetHeight,
            behavior: "smooth",
        });
    };

    const style =
        document.documentElement.offsetWidth < 640
            ? {
                top: "-1px",
            }
            : { top: `${headerRef.current.offsetHeight - 1}px` };

    // classes
    const navClasses = `border-b p-3 bg-white w-screen border-gray-300 fixed md:sticky z-20 rounded-b-2xl`;

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            ref={filterRef}
            style={style}
            className={navClasses}
        >
            <div className="overflow-x-auto">
                <div className="flex justify-center gap-10 min-w-max px-2 [&>div]:w-[40px]">
                    {/* Mappa dei filtri e applicazione del filtro selezionato */}
                    {filters.map((filter, index) => (
                        <div
                            key={Object.keys(filter)[0]}
                            className={`group flex flex-col items-center gap-2 cursor-pointer ${activeFilter === index
                                ? "opacity-100 font-semibold"
                                : "opacity-40"
                                }`}
                            onClick={() =>
                                handleFilterClick(Object.keys(filter)[0], index)
                            }
                        >
                            <img
                                src={`/filter_imgs/${Object.values(filter)[0]
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
        </motion.nav>
    );
}

export default HomePage;
