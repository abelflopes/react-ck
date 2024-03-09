import React from "react";
import { ElementCreator, Item } from "./types";

export interface SnackbarContextProps {
  add: (elementCreator: ElementCreator) => Item["id"];
  remove: (id: Item["id"]) => void;
}

export const SnackbarContext = React.createContext<SnackbarContextProps>({
  add: () => {
    throw new Error("Snackbar context not initialized");
  },
  remove: () => {
    throw new Error("Snackbar context not initialized");
  },
});
