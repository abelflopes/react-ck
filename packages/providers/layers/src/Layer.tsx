import React, { isValidElement, useContext, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { type LayerData, LayersContext } from "./context";
import { elevationMap, type Elevation } from "@react-ck/elevation";
import { DISPLAY_NAME_ATTRIBUTE, getDisplayName, DISPLAY_NAMES } from "@react-ck/react-utils";
import classNames from "classnames";
import styles from "./styles/index.module.scss";

interface LayerProps {
  /** The group name for the layer */
  group: LayerData["group"];
  /** The elevation level for the layer  */
  elevation: Elevation;
  /** The child components to be rendered within the layer */
  children?: React.ReactNode;
  /** Classname to apply on layer root element */
  className?: string;
  /** Callback function to receive layer information */
  onLayerInfo?: LayerData["onLayerInfo"];
}

/**
 * Component for creating a layer with a specific elevation level,
 * works with React portal - will render its children on document body
 * It also wraps the content in a theme provider
 *
 * @param props - {@link LayerProps}.
 * @returns The rendered content of the layer
 */

const Layer = ({
  elevation,
  children,
  className,
  onLayerInfo,
  group,
}: Readonly<LayerProps>): React.ReactNode => {
  const {
    registerLayer,
    usePortal,
    className: contextClassName,
    rootElement,
  } = useContext(LayersContext);

  const createdAt = useMemo(() => Date.now(), []);

  /** Renders the layer */
  useEffect(() => {
    const removeLayer = registerLayer({
      createdAt,
      elevationKey: elevation,
      onLayerInfo: (info) => {
        onLayerInfo?.(info);
      },
      group,
    });

    return removeLayer;
  }, [elevation, children, registerLayer, onLayerInfo, group, createdAt]);

  /** Validate children */
  useEffect(() => {
    // Validate icon usage (icon should be set through specific prop)
    for (const i of React.Children.toArray(children).filter(isValidElement)) {
      const name = getDisplayName(i);
      if (name === DISPLAY_NAMES.LAYER) throw new Error("Layers should not be directly nested");
    }
  }, [children]);

  const zIndex = useMemo(() => elevationMap[elevation], [elevation]);

  return (
    <>
      {usePortal
        ? createPortal(
            <div
              className={classNames(contextClassName, className, styles.layer)}
              style={
                // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- z-index is a css variable
                {
                  "--z-index": zIndex,
                } as React.CSSProperties
              }>
              {children}
            </div>,
            rootElement,
          )
        : null}

      {!usePortal && children}
    </>
  );
};

Layer[DISPLAY_NAME_ATTRIBUTE] = DISPLAY_NAMES.LAYER;

export { Layer, type LayerProps };
