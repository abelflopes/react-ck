import "./styles/index.module.scss";
import React, { useEffect, useMemo } from "react";
import { type Theme } from "./types";
import { defaultTheme } from "./themes/default";
import { ThemeContextProvider } from "./context";

type MappedTheme = Record<string, Record<string, number>>;

export interface ThemeProviderProps {
  target?: HTMLElement;
  theme?: Theme;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

/**
 * Injects theme CSS variables on the DOM and dynamically feeds
 * theme information to it's child components
 * @param props - {@link ThemeProviderProps}
 * @returns a React element
 */

export const ThemeProvider = ({
  target,
  theme = defaultTheme,
  children,
  className,
}: Readonly<ThemeProviderProps>): React.ReactElement => {
  const themeCssVariables = useMemo<React.CSSProperties>(
    () =>
      Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- required to simplify code
        Object.entries(theme as unknown as MappedTheme).flatMap(([context, data]) =>
          // Sync prefixing with /packages/utils/scss/src/_functions.scss
          // scss-utils.get-css-var
          Object.entries(data).map(([key, value]) => [`--react-ck-${context}-${key}`, value]),
        ),
      ),
    [theme],
  );

  useEffect(() => {
    if (!target) return;

    for (const [key, value] of Object.entries(themeCssVariables)) {
      if (typeof value !== "string") continue;
      target.style.setProperty(key, value);
    }

    if (className) target.classList.add(className);

    return () => {
      // eslint-disable-next-line @typescript-eslint/unbound-method -- other approach would make code unnecessarily complex
      Object.keys(themeCssVariables).forEach(target.style.removeProperty);

      if (className) target.classList.remove(className);
    };
  }, [className, target, themeCssVariables]);

  return (
    <ThemeContextProvider
      value={{
        theme,
      }}>
      {!target && (
        <div style={themeCssVariables} className={className}>
          {children}
        </div>
      )}

      {target ? children : null}
    </ThemeContextProvider>
  );
};
