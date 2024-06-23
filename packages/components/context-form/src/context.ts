import { createContext, useContext } from "react";

export interface ContextFormContextProps {
  setValue: (name: string, value: unknown) => void;
}

export const ContextFormContext = createContext<ContextFormContextProps>({
  setValue: () => {
    throw new Error("Context not initialized");
  },
});

export const useContextFormContext = (): ContextFormContextProps => useContext(ContextFormContext);
