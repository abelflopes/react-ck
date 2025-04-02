import React from "react";
import { type Elevation } from "@react-ck/elevation";

export interface LayerData {
  elevationKey: Elevation;
  group: string;
  node: React.ReactNode;
  onLayerInfo: ((info: LayerInfoContextProps) => void) | undefined;
}

export interface LayerInfoContextProps {
  /** The group of the layer */
  group: LayerData["group"];
  /** The elevation of the layer */
  elevation: LayerData["elevationKey"];
  /** The index of the current layer */
  layerIndex: number;
  /** The total number of layers currently rendered */
  maxLayerIndex: number;
  /** The index of the current layer in the elevation group */
  layerIndexInElevation: number;
  /** The total number of layers currently rendered in the elevation group */
  maxLayerIndexInElevation: number;
  /** The index of the current layer in the group */
  layerIndexInGroup: number;
  /** The total number of layers currently rendered in the group */
  maxLayerIndexInGroup: number;
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
