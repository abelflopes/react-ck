import { createContext } from "react";
import { type ChangeHandler, type SelectedValues } from "./types";

export interface SelectContextProps {
  selectedValues: SelectedValues;
  handleChange: ChangeHandler;
}

export const SelectContext = createContext<SelectContextProps | undefined>(undefined);
