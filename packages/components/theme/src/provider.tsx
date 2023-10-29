import "./styles/index.module.scss";
import React, { useMemo } from "react";
import type { Theme } from "./types";
import { defaultTheme } from "./themes/default";
import { ThemeContext } from "./context";
import { kebabCase } from "change-case";

export interface ThemeProviderProps {
  target?: HTMLElement;
  theme?: Theme;
  children?: React.ReactNode | React.ReactNode[];
}

type MappedTheme = Record<string, Record<string, number>>;

export const ThemeProvider = ({
  target,
  theme = defaultTheme,
  children,
}: Readonly<ThemeProviderProps>): React.ReactElement => {
  const themeCssVars = useMemo<React.CSSProperties>(() => {
    return Object.fromEntries(
      Object.entries(theme as unknown as MappedTheme).flatMap(([context, data]) =>
        Object.entries(data).map(([key, value]) => [
          "--" + kebabCase(context) + "-" + kebabCase(key),
          value,
        ]),
      ),
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={themeCssVars}>{children}</div>
    </ThemeContext.Provider>
  );
};
