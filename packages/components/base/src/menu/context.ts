import React from "react";

export interface MenuContextProps {
  variation: "vertical" | "horizontal";
}

export const menuContextDefaults: MenuContextProps = {
  variation: "vertical",
};

export const MenuContext = React.createContext<MenuContextProps>(menuContextDefaults);
