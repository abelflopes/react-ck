import { useContext } from "react";
import { GridContext, type GridContextProps } from "./context";

export const useGridContext = (): GridContextProps => useContext(GridContext);
