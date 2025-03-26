import React from "react";
import { type SnackbarContextProps } from "./types";

export const SnackbarContext = React.createContext<SnackbarContextProps>({
  add: () => {
    throw new Error("Snackbar context not initialized");
  },
  remove: () => {
    throw new Error("Snackbar context not initialized");
  },
});
