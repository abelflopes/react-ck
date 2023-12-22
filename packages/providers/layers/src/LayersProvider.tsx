import React, { useCallback, useMemo, useRef, useState } from "react";
import { type LayerData, LayersContext, type LayersContextProps } from "./context";
import { elevationMap } from "@react-ck/elevation";

/** Props for the LayersProvider component  */
export interface LayersProviderProps {
  /** The child components to be wrapped by the LayersProvider  */
  children?: React.ReactNode;
}

/** Data type for a layer with an additional 'id' property  */
type LayerList = Array<LayerData & { id: string }>;

/**
 * Provider component for managing (elevation) layers in a React application.
 *
 * @param props - The props for the LayersProvider component - {@link LayersProviderProps}
 * @returns The rendered LayersProvider component
 */

export const LayersProvider = ({ children }: Readonly<LayersProviderProps>): React.ReactElement => {
  const currlayer = useRef<number>(0);
  const [layers, setLayers] = useState<LayerList>([]);

  const createLayer = useCallback<LayersContextProps["createLayer"]>(({ elevationKey, node }) => {
    currlayer.current++;

    const id = `layer-${currlayer.current}`;

    setLayers((v) => [
      ...v,
      {
        id,
        elevationKey,
        node,
      },
    ]);

    return () => {
      setLayers((v) => v.filter((i) => i.id !== id));
    };
  }, []);

  const contextValue = useMemo<LayersContextProps>(() => ({ createLayer }), [createLayer]);

  // Sort layers by elevation
  const computedLayers = useMemo(
    () =>
      layers
        .sort((a, b) =>
          elevationMap[a.elevationKey] > elevationMap[b.elevationKey]
            ? 1
            : elevationMap[a.elevationKey] < elevationMap[b.elevationKey]
            ? -1
            : 0,
        )
        .map((i) => i.node),
    [layers],
  );

  return (
    <LayersContext.Provider value={contextValue}>
      {children}
      {computedLayers}
    </LayersContext.Provider>
  );
};
