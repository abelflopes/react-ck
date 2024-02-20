import React from "react";
import { type Elevation } from "@react-ck/elevation";

export interface LayerData {
  elevationKey: Elevation;
  node: React.ReactNode;
}

export interface LayersContextProps {
  createLayer: (data: LayerData) => () => void;
}

export const LayersContext = React.createContext<LayersContextProps>({
  createLayer: () => {
    throw new Error("Layers context not defined");
  },
});
