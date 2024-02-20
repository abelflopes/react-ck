import React, { useMemo } from "react";
import { type Theme } from "./types";
import { defaultTheme } from "./themes/default";
import { useThemeContext } from "./hooks";

export interface ThemeContextProps {
  inverted: boolean;
  theme: Theme;
}

export interface ThemeContextProviderProps {
  value?: Partial<ThemeContextProps>;
  children: React.ReactNode;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  inverted: false,
  theme: defaultTheme,
});

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
