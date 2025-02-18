import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import NavbarMobile from "../components/NavbarMobile";
import { RefsProvider } from "../Context/RefsContext";
import { lazy, Suspense } from "react";
import SkeleJumbotron from "../components/SkeleJumbotron";
import Jumbotron from "../components/Jumbotron";
const LazyJumbotron = lazy(() => import("../components/Jumbotron"));

function DefaultLayout() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const location = useLocation();
  return (
    <RefsProvider>
      <Header />
      {location.pathname === "/" && (
        <Suspense fallback={<SkeleJumbotron />}>
          <LazyJumbotron />
        </Suspense>
      )}
      <Main>
        <ToastContainer
          className={"z-9999999"}
          position="bottom-right"
          autoClose={700}
        />
        <Outlet />
        <NavbarMobile />
      </Main>
      {/* <Footer /> */}
    </RefsProvider>
  );
}

export default DefaultLayout;
