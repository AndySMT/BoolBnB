import React, { useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { NavLink, Link, useLocation } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import { useRefsContext } from "../Context/RefsContext";
import { PiBookmarks } from "react-icons/pi";

const Header = () => {
    return (
        <>
            <HeaderComp>
                <Link to="/">
                    <img
                        src="/bed-and-breakfast.png"
                        alt="logo"
                        className="w-10 h-10"
                    />
                </Link>
                <div className="flex gap-8">
                    <HeaderLink
                        to={"/addproperty"}
                        text={"Affitta con BoolB&B"}
                    >
                        <IoIosStarOutline className="text-xl" />
                    </HeaderLink>
                    <HeaderLink to={"/favourites"} text={"I tuoi preferiti"}>
                        <PiBookmarks className="text-xl" />
                    </HeaderLink>
                </div>
            </HeaderComp>
        </>
    );
};

function HeaderLink({ to, text, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                "flex items-center gap-1 pb-1 px-1 text-stone-600" + (isActive ? " text-stone-900 font-semibold" : "")
            }
        >
            {children}
            <span>{text}</span>
        </NavLink>
    );
}

function HeaderComp({ children }) {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    const { jumboRef, headerRef } = useRefsContext();

    // bad practice => numero magico: altezza in px della jumbo
    const transAnim = useScroll(
        jumboRef.current?.offsetHeight - headerRef.current?.offsetHeight / 2
    );

    useEffect(() => {
        location.pathname === "/" ? setIsVisible(true) : setIsVisible(false);
    }, [location.pathname]);
    return (
        <header
            ref={headerRef}
            className={`${!transAnim && "-translate-y-20"} ${
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
