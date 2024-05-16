import React, { isValidElement, useContext, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { LayersContext } from "./context";
import { type Elevation } from "@react-ck/elevation";
import { getDisplayName } from "@react-ck/react-utils";
import { ThemeProvider, useThemeContext } from "@react-ck/theme";

export interface LayerProps {
  /** The elevation level for the layer  */
  elevation: Elevation;
  /** The child components to be rendered within the layer */
  children?: React.ReactNode;
}

/**
 * Component for creating a layer with a specific elevation level,
 * works with React portal - will render its children on document body
 * It also wraps the content in a theme provider
 *
 * @param props - {@link LayerProps}.
 * @returns The rendered content of the layer
 */

export const Layer = ({ elevation, children }: Readonly<LayerProps>): React.ReactNode => {
  const theme = useThemeContext();
  const { createLayer } = useContext(LayersContext);

  /** Generates the portal element wrapped by theme */
  const layerElement = useMemo(
    () =>
      createPortal(<ThemeProvider theme={theme.theme}>{children}</ThemeProvider>, document.body),
    [children, theme.theme],
  );

  /** Renders the layer */
  useEffect(() => {
    const removeLayer = createLayer({
      elevationKey: elevation,
      node: layerElement,
    });

    return removeLayer;
  }, [elevation, children, createLayer, theme, layerElement]);

  /** Validate children */
  useEffect(() => {
    // Validate icon usage (icon should be set through specific prop)
    for (const i of React.Children.toArray(children).filter(isValidElement)) {
      const name = getDisplayName(i);
      if (name && name.toLowerCase().includes("layer"))
        throw new Error("Layers should not be directly nested");
    }
  }, [children]);

  return undefined;
};
