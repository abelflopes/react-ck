import styles from "./styles/index.module.scss";
import React, { isValidElement, useContext, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { LayersContext } from "./context";
import { type Elevation } from "@react-ck/elevation";
import { DISPLAY_NAME_ATTRIBUTE, getDisplayName, DISPLAY_NAMES } from "@react-ck/react-utils";
import { ThemeProvider, useThemeContext } from "@react-ck/theme";
import classNames from "classnames";

interface LayerProps {
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

const Layer = ({ elevation, children }: Readonly<LayerProps>): React.ReactNode => {
  const theme = useThemeContext();
  const { createLayer, usePortal, className } = useContext(LayersContext);

  /** Generates the portal element wrapped by theme */
  const layerElement = useMemo(
    () =>
      usePortal
        ? createPortal(
            <ThemeProvider theme={theme.theme} className={classNames(className, styles.root)}>
              {children}
            </ThemeProvider>,
            document.body,
          )
        : children,
    [children, className, theme.theme, usePortal],
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
      if (name === DISPLAY_NAMES.LAYER) throw new Error("Layers should not be directly nested");
    }
  }, [children]);

  return undefined;
};

Layer[DISPLAY_NAME_ATTRIBUTE] = DISPLAY_NAMES.LAYER;

export { Layer, type LayerProps };
