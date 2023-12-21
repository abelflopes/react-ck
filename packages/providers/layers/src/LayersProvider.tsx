import React, { useCallback, useMemo, useRef, useState } from "react";
import { type LayerData, LayersContext, type LayersContextProps } from "./context";
import { elevationMap } from "@react-ck/elevation";

export interface LayersProviderProps {
  children?: React.ReactNode;
}

type LayerList = Array<LayerData & { id: string }>;

// TODO: add annotation

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
