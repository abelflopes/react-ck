import React from "react";
import { ThemeProvider, type ThemeProviderProps } from "@react-ck/theme";
import { LayersProvider } from "@react-ck/layers";

/** Props for the Manager component  */
export interface ManagerProps {
  /** Properties of the {@link ThemeProvider} */
  theme?: Omit<ThemeProviderProps, "children">;
  /** Content slot */
  children: React.ReactNode;
}

/**
 * Manager component for handling themes and layers.
 * @param props - {@link ManagerProps}
 * @returns The provided content wrapped by theme & layers providers.
 */
export const Manager = ({ theme, children }: Readonly<ManagerProps>): React.ReactElement => (
  <ThemeProvider {...theme}>
    <LayersProvider>{children}</LayersProvider>
  </ThemeProvider>
);
