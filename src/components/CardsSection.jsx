
function CardsSection({ children, title, classes }) {

    return (
        <section className={`p-6 lg:px-38 pt-24 ${classes}`}>
            <h2 className="text-xl font-semibold mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {children}
            </div>
        </section>
    );
}

export default CardsSection;
