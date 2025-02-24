import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

function HamburgerMenu({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        location.pathname === "/" && setIsOpen(false);
    }, [location.pathname]);

    return (
        <div className="relative sm:hidden">
            {/* icon */}
            <GiHamburgerMenu
                onClick={() => setIsOpen((curr) => !curr)}
                className="text-2xl"
            />
            {/* menu */}
            {isOpen && (
                <nav className="backdrop-blur-md border rounded-lg max-w-[50vw] w-[200px]   p-4 flex flex-col gap-4 absolute top-full translate-y-2 right-0 z-50">
                    {children}
                </nav>
            )}
        </div>
    );
}

export default HamburgerMenu;
