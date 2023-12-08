import React from "react";
import { ThemeProvider, type ThemeProviderProps } from "@react-ck/theme";

export interface ManagerProps {
  theme?: Omit<ThemeProviderProps, "children">;
  children: React.ReactNode;
}

export const Manager = ({ theme, children }: Readonly<ManagerProps>): React.ReactElement => (
  <ThemeProvider {...theme}>{children}</ThemeProvider>
);
