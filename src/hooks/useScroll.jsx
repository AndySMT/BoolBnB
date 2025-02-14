import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScroll = (threshold = 200) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            scrollTop === 0
                ? setIsVisible(true)
                : setIsVisible(scrollTop < threshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    return isVisible;
};

export default useScroll;
