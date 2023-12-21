import React from "react";
import { ThemeProvider, type ThemeProviderProps } from "@react-ck/theme";
import { LayersProvider } from "@react-ck/layers";

export interface ManagerProps {
  theme?: Omit<ThemeProviderProps, "children">;
  children: React.ReactNode;
}

// TODO: add annotation
export const Manager = ({ theme, children }: Readonly<ManagerProps>): React.ReactElement => (
  <ThemeProvider {...theme}>
    <LayersProvider>{children}</LayersProvider>
  </ThemeProvider>
);
