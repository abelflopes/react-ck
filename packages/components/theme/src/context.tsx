import React, { useContext } from "react";
import type { Theme } from "./types";
import { defaultTheme } from "./themes/default";

export const ThemeContext = React.createContext<Theme>(defaultTheme);

export const useThemeContext = (): Theme => useContext(ThemeContext);
