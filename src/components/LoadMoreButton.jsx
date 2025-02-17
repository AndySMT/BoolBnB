import { LuArrowBigDownDash } from "react-icons/lu";

function LoadMoreButton({ onClick, noMore }) {
    return (
        <button
            disabled={noMore}
            onClick={onClick}
            className={`px-4 py-2 border border-[#2d812b] bg-[#b6cf978c] rounded-4xl scale-95 cursor-not-allowed ${
                !noMore &&
                "hover:bg-[#90aa72] hover:scale-100 hover:text-white cursor-pointer"
            }`}
        >
            <LuArrowBigDownDash />
        </button>
    );
}

export default LoadMoreButton;
