function LoadMoreButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-3 border border-[#2d812b] bg-[#a7d3a6] rounded-4xl scale-95 hover:bg-[#2d812b] hover:scale-100 hover:text-white cursor-pointer"
        >
            Load More
        </button>
    );
}

export default LoadMoreButton;
