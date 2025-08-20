import React, { useContext } from "react";

export interface ManagerContextProps {
  generateUniqueId: () => string;
}
export const ManagerContext = React.createContext<ManagerContextProps>({
  generateUniqueId: () => {
    throw new Error("ManagerContext is not set");
  },
});

export const useManagerContext = (): ManagerContextProps => useContext(ManagerContext);
