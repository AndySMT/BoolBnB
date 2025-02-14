import { createContext, useContext, useRef } from "react";


const refsContext = createContext();

const RefsProvider = ({ children }) => {
    const headerRef = useRef(null);
    const jumboRef = useRef(null);

    return (
        <refsContext.Provider value={{ headerRef, jumboRef }}>
            {children}
        </refsContext.Provider>
    );
};

const useRefsContext = () => {
    const context = useContext(refsContext);
    return context;
};

export { RefsProvider, useRefsContext };
