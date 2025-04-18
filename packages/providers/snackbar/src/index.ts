import React, { useContext } from "react";

export interface Item {
  id: string;
  element: React.ReactNode;
  /** Callback to execute when item is removed */
  onRemove?: () => void;
}

export type ElementCreator = (id: Item["id"]) => Item["element"];

export interface AddOptions extends Pick<Item, "onRemove"> {
  /** Duration time for the item to be displayed */
  duration?: "short" | "medium" | "long";
}

export interface SnackbarContextProps {
  add: (elementCreator: ElementCreator, options?: AddOptions) => Item["id"];
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

export const useSnackbar = (): SnackbarContextProps => useContext(SnackbarContext);
