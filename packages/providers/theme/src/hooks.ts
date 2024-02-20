import { useContext } from "react";
import { ThemeContext, type ThemeContextProps } from "./context";

export const useThemeContext = (): ThemeContextProps => useContext(ThemeContext);
