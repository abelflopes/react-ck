import React, { useMemo, useState } from "react";
import { ThemeProvider, type ThemeProviderProps } from "@react-ck/theme";
import { LayersProvider, type LayersProviderProps } from "@react-ck/layers";
import { ManagerContext, ManagerContextProps } from "./context";

/** Props for the Manager component  */
export interface ManagerProps {
  /** Properties of the {@link ThemeProvider} */
  theme?: Omit<ThemeProviderProps, "children" | "className">;
  /** If true, renders app layers on document body instead of on same level of root element,
   * if set to false keep in mind that tit might affect positioning of floating elements */
  usePortal?: LayersProviderProps["usePortal"];
  /** CSS class to apply in layer elements, use for for applying scoped generic styles such as font-family */
  className?: LayersProviderProps["className"];
  /** Unique id generator function */
  generateUniqueId?: ManagerContextProps["generateUniqueId"];
  /** Content slot */
  children: React.ReactNode;
}

const defaultgenerateUniqueId = (): string =>
  `rck-${Math.random().toString(36).slice(2, 15)}-${Date.now().toString(36)}`;

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
  generateUniqueId = defaultgenerateUniqueId,
}: Readonly<ManagerProps>): React.ReactElement => {
  const [layerRootElement, setLayerRootElement] = useState<HTMLElement>(
    theme?.target ?? document.body,
  );

  const contextValue = useMemo<ManagerContextProps>(
    () => ({ generateUniqueId }),
    [generateUniqueId],
  );

  return (
    <ThemeProvider {...theme} className={className} onThemeRootChange={setLayerRootElement}>
      <ManagerContext.Provider value={contextValue}>
        <LayersProvider usePortal={usePortal} className={className} rootElement={layerRootElement}>
          {children}
        </LayersProvider>
      </ManagerContext.Provider>
    </ThemeProvider>
  );
};
