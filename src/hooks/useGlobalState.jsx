import { createContext, useContext, useState } from "react";

const Context = createContext({})

export const GlobalStateProvider = ({ children }) => {
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false)
    return <Context.Provider value={{ isOpenSearchModal, setIsOpenSearchModal }}>{children}</Context.Provider>
}

export const useGlobalState = () => useContext(Context)