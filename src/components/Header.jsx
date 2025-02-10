import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
    IoIosStarOutline,
    IoMdHeartEmpty,
    IoMdSearch,
    IoMdAddCircleOutline,
} from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { NavLink, Link, useLocation } from "react-router-dom";
import useScroll from "../hooks/useScroll";
import NavbarMobile from "./NavbarMobile";
import { useRefsContext } from "../Context/RefsContext";

const Header = () => {
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
        <>
            <header
                ref={headerRef}
                className={`${!transAnim && "-translate-y-20"} ${
                    !isVisible && "hidden sm:flex"
                }
            rounded-b-2xl sm:rounded-b-none
            sm:!-translate-0 flex bg-linear-90/oklch sm:drop-shadow-lg from-[#d4c685] to-[#a7d3a6] text-center p-5 lg:px-8 justify-between fixed sm:sticky w-screen top-[-1px] z-40 text-stone-800 text-sm transition-all duration-200 ease-in`}
            >
                <Link to="/">
                    <img
                        src="/bed-and-breakfast.png"
                        alt="logo"
                        className="w-10 h-10"
                    />
                </Link>
                <NavLink className="flex items-center gap-1">
                    <IoIosStarOutline className="text-xl" />
                    <span>Rent with BoolB&B</span>
                </NavLink>
            </header>
        </>
    );
};

export default Header;
