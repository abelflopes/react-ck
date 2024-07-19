import React from "react";
import { ThemeProvider, type ThemeProviderProps } from "@react-ck/theme";
import { LayersProvider, type LayersProviderProps } from "@react-ck/layers";

/** Props for the Manager component  */
export interface ManagerProps {
  /** Properties of the {@link ThemeProvider} */
  theme?: Omit<ThemeProviderProps, "children" | "className">;
  /** If true, renders app layers on document body instead of on same level of root element,
   * if set to false keep in mind that tit might affect positioning of floating elements */
  usePortal?: LayersProviderProps["usePortal"];
  /** CSS class to apply in layer elements, use for for applying scoped generic styles such as font-family */
  className?: LayersProviderProps["className"];
  /** Content slot */
  children: React.ReactNode;
}

/**
 * Manager component for handling themes and layers.
 * @param props - {@link ManagerProps}
 * @returns The provided content wrapped by theme & layers providers.
 */
export const Manager = ({
  theme,
  children,
  usePortal = true,
  className,
}: Readonly<ManagerProps>): React.ReactElement => (
  <ThemeProvider {...theme} className={className}>
    <LayersProvider usePortal={usePortal} className={className}>
      {children}
    </LayersProvider>
  </ThemeProvider>
);
