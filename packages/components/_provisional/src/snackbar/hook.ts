import { useContext } from "react";
import { SnackbarContext, type SnackbarContextProps } from "./context";

export const useSnackbar = (): SnackbarContextProps => useContext(SnackbarContext);
