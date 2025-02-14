import React, { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { NavLink, Link, useLocation } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import { useRefsContext } from "../Context/RefsContext";
import { PiBookmarks } from "react-icons/pi";

const Header = () => {
    const { jumboRef, headerRef } = useRefsContext();
    const location = useLocation();

    // booleano controllato dallo scroll della window, useScroll prende come param l'offset
    const isVisible = useScroll(
        jumboRef.current?.offsetHeight - headerRef.current?.offsetHeight / 1.5
    );

    // isVisible controlla la visibilita del bookLink
    // location limita l'animazione in HomePage ("/")
    const bookLinkClass = `
        ${
            !isVisible &&
            "visible sm:opacity-100 sm:!translate-x-0 sm:!translate-y-0"
        }  
        ${
            location.pathname === "/" &&
            "invisible sm:opacity-0 sm:translate-x-[50px] sm:translate-y-[20px] lg:translate-x-[-250px] lg:translate-y-[20px] transition-all duration-500"
        }  
        hidden sm:block bg-[#d4c685] py-2 rounded-md border-2 border-stone-500 hover:bg-[#cabc7d] cursor-pointer
        min-w-72 lg:px-16 text-lg font-semibold text-stone-900`;

    return (
        <>
            <HeaderComp
                jumboRef={jumboRef}
                headerRef={headerRef}
                isVisible={isVisible}
                location={location}
            >
                <Link to="/">
                    <img
                        src="/bed-and-breakfast.png"
                        alt="logo"
                        className="w-10 h-10"
                    />
                </Link>
                {/* Book Now */}
                <Link to={"search"} className={bookLinkClass}>
                    Cerca l'alloggio che fa per te
                </Link>
                {/* Nav */}
                <nav className="flex gap-8">
                    <HeaderLink
                        to={"/addproperty"}
                        text={"Affitta con BoolB&B"}
                    >
                        <IoIosStarOutline className="text-xl" />
                    </HeaderLink>
                    <HeaderLink to={"/favourites"} text={"I tuoi preferiti"}>
                        <PiBookmarks className="text-xl" />
                    </HeaderLink>
                </nav>
            </HeaderComp>
        </>
    );
};

function HeaderLink({ to, text, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                "flex items-center gap-1 pb-1 px-1 text-stone-600" +
                (isActive ? " text-stone-900 font-semibold" : "")
            }
        >
            {children}
            <span>{text}</span>
        </NavLink>
    );
}

function HeaderComp({ children, headerRef, isVisible: isNotTriggeredAnim, location }) {
    const [isVisible, setIsVisible] = useState(true);

    // controllo della visibilita dell header in base alla location pathname
    useEffect(() => {
        location.pathname === "/" ? setIsVisible(true) : setIsVisible(false);
    }, [location.pathname]);
    return (
        <header
            ref={headerRef}
            // 
            className={`${!isNotTriggeredAnim && "-translate-y-20"} ${
                !isVisible && "hidden sm:flex"
            } 
            lg:px-[4vw] items-center rounded-b-2xl sm:rounded-b-none sm:!-translate-0 flex 
            bg-linear-90/oklch sm:drop-shadow-lg from-15% from-[#d4c685] to-[#a7d3a6] text-center p-5 
            justify-between fixed sm:sticky w-screen top-[-1px] z-40 text-stone-800 text-sm transition-all duration-200 ease-in`}
        >
            {children}
        </header>
    );
}

export default Header;
