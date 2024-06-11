import { createContext, useContext } from "react";

export interface AppContextProps {
  title: string;
}

export const AppContext = createContext<AppContextProps>({
  title: "-",
});

export const AppContextProvider = AppContext.Provider;

export const useAppContext = (): AppContextProps => useContext(AppContext);
