import { useState, useEffect } from "react";

const useScroll = (threshold = 200) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            setIsVisible(scrollTop < threshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [threshold]);

    return isVisible;
};

export default useScroll;
