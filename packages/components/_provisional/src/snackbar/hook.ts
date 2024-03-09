import { useContext } from "react";
import { SnackbarContext, type SnackbarContextProps } from "./context";

export const useSnackbarContext = (): SnackbarContextProps => useContext(SnackbarContext);
