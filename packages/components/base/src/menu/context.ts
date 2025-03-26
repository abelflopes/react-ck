import React from "react";

/**
 * Context props for the Menu component.
 * Controls layout direction of menu items.
 */
export interface MenuContextProps {
  /** Layout direction for menu items.
   * @default "vertical"
   */
  variation: "vertical" | "horizontal";
}

/** Default values for menu context */
export const menuContextDefaults: MenuContextProps = {
  variation: "vertical",
};

/** Context for sharing menu configuration with child components */
export const MenuContext = React.createContext<MenuContextProps>(menuContextDefaults);
