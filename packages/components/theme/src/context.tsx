import React, { useContext, useMemo } from "react";
import type { Theme } from "./types";
import { defaultTheme } from "./themes/default";

export interface ThemeContextProps {
  inverted: boolean;
  theme: Theme;
}

export const themeContextDefaults: ThemeContextProps = {
  inverted: false,
  theme: defaultTheme,
};

export interface ThemeContextProviderProps {
  value?: Partial<ThemeContextProps>;
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<ThemeContextProps>(themeContextDefaults);

export const useThemeContext = (): ThemeContextProps => useContext(ThemeContext);

export const ThemeContextProvider = ({
  value,
  children,
}: Readonly<ThemeContextProviderProps>): React.ReactElement => {
  const parentContext = useThemeContext();

  const computedValue = useMemo(
    () => ({
      ...parentContext,
      ...value,
    }),
    [value, parentContext],
  );

  return <ThemeContext.Provider value={computedValue}>{children}</ThemeContext.Provider>;
};
