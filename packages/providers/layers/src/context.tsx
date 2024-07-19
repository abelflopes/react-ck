import React from "react";
import { type Elevation } from "@react-ck/elevation";

export interface LayerData {
  elevationKey: Elevation;
  node: React.ReactNode;
}

export interface LayersContextProps {
  /** If true, renders app layers on document body instead of on same level of root element,
   * if set to false keep in mind that tit might affect positioning of floating elements */
  usePortal: boolean;
  createLayer: (data: LayerData) => () => void;
  className?: string;
}

export const LayersContext = React.createContext<LayersContextProps>({
  className: undefined,
  usePortal: true,
  createLayer: () => {
    throw new Error("Layers context not defined");
  },
});
