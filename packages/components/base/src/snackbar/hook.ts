import { useContext } from "react";
import { SnackbarContext } from "./context";
import { type SnackbarContextProps } from "./types";

export const useSnackbar = (): SnackbarContextProps => useContext(SnackbarContext);
