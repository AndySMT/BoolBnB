import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import NavbarMobile from "../components/NavbarMobile";
import { RefsProvider } from "../Context/RefsContext";

function DefaultLayout() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return (
        <RefsProvider>
            <Header />
            <Main>
                <Outlet />
                <NavbarMobile />
            </Main>
            {/* <Footer /> */}
        </RefsProvider>
    );
}

export default DefaultLayout;
