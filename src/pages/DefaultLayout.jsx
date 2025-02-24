import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Main from "../components/Main";
import NavbarMobile from "../components/NavbarMobile";
import { RefsProvider } from "../Context/RefsContext";
import { lazy, Suspense } from "react";
import SkeleJumbotron from "../components/SkeleJumbotron";
import Footer from "../components/Footer";
const LazyJumbotron = lazy(() => import("../components/Jumbotron"));

function DefaultLayout() {
  const location = useLocation();
  location.pathname !== "/" && window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  return (
    <RefsProvider>
      <Header />
      {location.pathname === "/" && (
        <Suspense fallback={<SkeleJumbotron />}>
          <LazyJumbotron />
        </Suspense>
      )}
      <Main>
        {/* <div className="hidden sm:block">
          <ToastContainer
            className={"z-9999999"}
            position="bottom-right"
            autoClose={1500}
          />
        </div> */}
          <ToastContainer
            className={"z-9999999"}
            position={document.documentElement.clientWidth < 640 ?  "top-right" : "bottom-right"}
            autoClose={1500}
          />
        <Outlet />
        <NavbarMobile />
      </Main>
      <>
        {!(location.pathname === "/" || location.pathname.includes("search")) &&
          <Footer />
        }
      </>
    </RefsProvider>
  );
}



export default DefaultLayout;
