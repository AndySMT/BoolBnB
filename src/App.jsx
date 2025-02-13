import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import SearchPropertyPage from "./pages/SearchPropertyPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyDetail from "./pages/PropertyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RefsProvider } from "./Context/RefsContext";
import { lazy, Suspense } from "react";
import Preferiti from "./components/Preferiti";
const LazyHomePage = lazy(() => import("./pages/HomePage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RefsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={DefaultLayout}>
              <Route
                index
                element={
                  <Suspense fallback={<>Suspense Loading...</>}>
                    <LazyHomePage />
                  </Suspense>
                }
              />
              <Route path="search" Component={SearchPropertyPage} />
              <Route path="addproperty" Component={AddPropertyPage} />

              <Route path="detail/:id" Component={PropertyDetail}>
                {/* <Route path="preferiti" component={Preferiti} /> */}
              </Route>
              <Route path="*" Component={ErrorPage} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RefsProvider>
    </QueryClientProvider>
  );
}

export default App;
