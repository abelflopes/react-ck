import React, { isValidElement, useContext, useEffect } from "react";
import { LayersContext } from "./context";
import { type Elevation } from "@react-ck/elevation";
import { getDisplayName } from "@react-ck/react-utils";

export interface LayerProps {
  elevation: Elevation;
  children?: React.ReactNode;
}

// TODO: add annotation

export const Layer = ({ elevation, children }: Readonly<LayerProps>): React.ReactNode => {
  const { createLayer } = useContext(LayersContext);

  useEffect(() => {
    const removeLayer = createLayer({ elevationKey: elevation, node: children });

    return removeLayer;
  }, [elevation, children, createLayer]);

  useEffect(() => {
    // Validate icon usage (icon should be set through specific prop)
    React.Children.toArray(children)
      .filter(isValidElement)
      .forEach((i) => {
        const name = getDisplayName(i);
        if (name && name.toLowerCase().includes("layer")) {
          throw new Error("Layers should not be directly nested");
        }
      });
  }, [children]);

  return undefined;
};
