import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { PiBookmarks } from "react-icons/pi";

function NavbarMobile() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  // per nascondere navbar in detail page
  // useEffect(() => {
  //     location.pathname.includes("/detail")
  //         ? setIsVisible(false)
  //         : setIsVisible(true);
  // }, [location.pathname]);

  return (
    <>
      {isVisible && (
        <nav className="bg-[#fcfcfc] bottom-[-1px] w-screen py-3 border-t-2 rounded-2xl border-t-stone-300 z-30 fixed grid grid-cols-3 md:hidden text-stone-900">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              "flex justify-center items-center  flex-col " +
              (isActive ? "text-[#3c9b3b]" : "")
            }
          >
            <IoMdSearch className="text-2xl" />
            <span className="capitalize text-sm">explore</span>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              "flex justify-center items-center  flex-col " +
              (isActive ? "text-[#3c9b3b]" : "")
            }
          >
            <AiFillHome className="text-2xl" />

            <span className="capitalize text-sm">Home</span>
          </NavLink>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              "flex justify-center items-center  flex-col " +
              (isActive ? "text-[#3c9b3b]" : "")
            }
          >
            <PiBookmarks className="text-2xl" />
            <span className="capitalize text-sm">Saved</span>
          </NavLink>
          <NavLink
            to="/addproperty"
            className={({ isActive }) =>
              "flex justify-center items-center  flex-col " +
              (isActive ? "text-[#3c9b3b]" : "")
            }
          >
            <IoMdAddCircleOutline className="text-2xl" />
            <span className="capitalize text-sm">add property</span>
          </NavLink>
        </nav>
      )}
    </>
  );
}

export default NavbarMobile;
