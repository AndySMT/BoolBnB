import SkeleCard from "./SkeleCard";

function SkeleCardsSection() {
    return (
        <section className={`p-6 lg:px-38 pt-24 is-loading`}>
            <h1 className=" text-xl font-semibold mb-6 w-fit">I preferiti degli ospiti</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <SkeleCard key={i} />
                ))}
            </div>
        </section>
    );
}

export default SkeleCardsSection;
