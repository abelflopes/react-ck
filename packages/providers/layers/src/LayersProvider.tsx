import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type LayerData, LayersContext, type LayersContextProps } from "./context";
import { elevationMap } from "@react-ck/elevation";

/** Props for the LayersProvider component  */
/** Data type for a layer with an additional 'id' property  */
type LayerList = Array<LayerData & { id: string }>;

export interface LayersProviderProps
  extends Partial<Pick<LayersContextProps, "usePortal" | "className">> {
  /** The child components to be wrapped by the LayersProvider  */
  children?: React.ReactNode;
}

/**
 * Provider component for managing (elevation) layers in a React application.
 *
 * @param props - The props for the LayersProvider component - {@link LayersProviderProps}
 * @returns The rendered LayersProvider component
 */

export const LayersProvider = ({
  children,
  usePortal = true,
  className,
}: Readonly<LayersProviderProps>): React.ReactElement => {
  const currLayer = useRef<number>(0);
  const [layers, setLayers] = useState<LayerList>([]);

  const createLayer = useCallback<LayersContextProps["createLayer"]>((LayerData) => {
    currLayer.current += 1;

    const id = `layer-${currLayer.current}`;

    setLayers((v) => [
      ...v,
      {
        ...LayerData,
        id,
      },
    ]);

    return () => {
      setLayers((v) => v.filter((i) => i.id !== id));
    };
  }, []);

  const contextValue = useMemo<LayersContextProps>(
    () => ({ createLayer, usePortal, className }),
    [className, createLayer, usePortal],
  );

  // Sort layers by elevation
  const sortedLayers = useMemo(
    () =>
      [...layers].sort((a, b) => {
        if (elevationMap[a.elevationKey] > elevationMap[b.elevationKey]) return 1;
        else if (elevationMap[a.elevationKey] < elevationMap[b.elevationKey]) return -1;
        return 0;
      }),
    [layers],
  );

  const layerElements = useMemo(() => [...sortedLayers].map((i) => i.node), [sortedLayers]);

  useEffect(() => {
    sortedLayers.forEach((layer, layerIndex) => {
      const layersInElevation = sortedLayers.filter((i) => i.elevationKey === layer.elevationKey);

      const layersInGroup = sortedLayers.filter((i) => i.group === layer.group);

      layer.onLayerInfo?.({
        group: layer.group,
        elevation: layer.elevationKey,
        maxLayerIndex: sortedLayers.length - 1,
        layerIndex,
        layerIndexInElevation: layersInElevation.indexOf(layer),
        maxLayerIndexInElevation: layersInElevation.length - 1,
        layerIndexInGroup: layersInGroup.indexOf(layer),
        maxLayerIndexInGroup: layersInGroup.length - 1,
      });
    });
  }, [sortedLayers]);

  return (
    <LayersContext.Provider value={contextValue}>
      {children}

      {layerElements}
    </LayersContext.Provider>
  );
};
