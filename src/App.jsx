import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import SearchPropertyPage from "./pages/SearchPropertyPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyDetail from "./pages/PropertyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LostPage from "./pages/lostPage";
import { RefsProvider } from "./Context/RefsContext";
import { lazy, Suspense } from "react";
import FavouritesPage from "./pages/FavouritesPage";
const LazyHomePage = lazy(() => import("./pages/HomePage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <RefsProvider> */}
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
            <Route path="detail/:id" Component={PropertyDetail} />
            <Route path="favourites" Component={FavouritesPage} />
            <Route path="lost" Component={LostPage} />
            <Route path="*" Component={ErrorPage} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* </RefsProvider> */}
    </QueryClientProvider>
  );
}

export default App;
