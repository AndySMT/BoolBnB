import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import HomePage from "./pages/HomePage";
import SearchPropertyPage from "./pages/SearchPropertyPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyDetail from "./pages/PropertyDetailPage";
import ErrorPage from "./pages/ErrorPage";
// import { GlobalProvider } from "./Context/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RefsProvider } from "./Context/RefsContext";

const queryClient = new QueryClient();

// ! NON USARE GlobalProvider => GUARDARE cartella hooks
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <GlobalProvider> */}
            <RefsProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" Component={DefaultLayout}>
                            <Route index Component={HomePage} />
                            <Route
                                path="search"
                                Component={SearchPropertyPage}
                            />
                            <Route
                                path="addproperty"
                                Component={AddPropertyPage}
                            />
                            <Route
                                path="detail/:id"
                                Component={PropertyDetail}
                            />
                            <Route path="*" Component={ErrorPage} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </RefsProvider>
            {/* </GlobalProvider> */}
        </QueryClientProvider>
    );
}

export default App;
