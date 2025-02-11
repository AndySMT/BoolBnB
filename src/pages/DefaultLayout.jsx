import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import NavbarMobile from "../components/NavbarMobile";

function DefaultLayout() {
    return (
        <>
            <Header />
            <Main>
                <Outlet />
                <NavbarMobile/>
            </Main>
            {/* <Footer /> */}
        </>
    );
}

export default DefaultLayout;
