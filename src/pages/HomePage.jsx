import React, { useState } from "react";
import CardsSection from "../components/CardsSection";
import Card from "../components/Card";
import { useGetPropertiesQuery } from "../hooks/useDataQuery";
import Jumbotron from "../components/Jumbotron";

function HomePage() {
    const [activeFilter, setActiveFilter] = useState(null);
    const { isLoading, isError, data } = useGetPropertiesQuery();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <pre>Error</pre>;

    const filteredProperties = !activeFilter 
        ? data 
        : data.filter(prop => prop.property_type?.toLowerCase().includes(activeFilter.toLowerCase()));


    return (
        <>
            <Jumbotron />
            <SearchAndFilterSection 
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />
            <CardsSection title={""}>
                {filteredProperties?.map((prop, index) => (
                    <Card key={prop.id} index={index} property={prop} />
                ))}
            </CardsSection>
        </>
    );
}

function SearchBarMobile() {
    return <div></div>;
}

function SearchAndFilterSection({ activeFilter, onFilterChange }) {
    const filters = [
        "baita",
        "schiera",
        "indipendente",
        "villa",
        "appartamento",
        "chalet",
    ];

    return (
        <div className="border-b p-3 bg-white w-screen border-gray-300 fixed md:sticky top-[-1px] sm:top-20 z-20 rounded-b-2xl">
            <div className="overflow-x-auto">
                <div className="flex justify-center gap-10 min-w-max px-2 [&>div]:w-[40px]">
                    {filters.map((filter) => (
                        <div 
                            key={filter} 
                            className={`group flex flex-col items-center gap-2 hover:cursor-pointer ${
                                activeFilter === filter ? 'opacity-100' : 'opacity-50'
                            }`}
                            onClick={() => onFilterChange(filter === activeFilter ? null : filter)}
                        >
                            <img 
                                src={`/filter_imgs/${filter}.png`} 
                                alt={filter} 
                                className="w-6 h-6 group-hover:opacity-100"
                            />
                            <span className="text-xs text-gray-600 group-hover:opacity-100">
                                {filter}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
