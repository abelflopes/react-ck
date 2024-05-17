import React, { useCallback, useMemo, useRef, useState } from "react";
import { type LayerData, LayersContext, type LayersContextProps } from "./context";
import { elevationMap } from "@react-ck/elevation";

/** Props for the LayersProvider component  */
/** Data type for a layer with an additional 'id' property  */
type LayerList = Array<LayerData & { id: string }>;

export interface LayersProviderProps extends Pick<LayersContextProps, "usePortal"> {
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
  usePortal,
}: Readonly<LayersProviderProps>): React.ReactElement => {
  const currlayer = useRef<number>(0);
  const [layers, setLayers] = useState<LayerList>([]);

  const createLayer = useCallback<LayersContextProps["createLayer"]>(({ elevationKey, node }) => {
    currlayer.current += 1;

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

  const contextValue = useMemo<LayersContextProps>(
    () => ({ createLayer, usePortal }),
    [createLayer, usePortal],
  );

  // Sort layers by elevation
  const computedLayers = useMemo(
    () =>
      [...layers]
        .sort((a, b) => {
          if (elevationMap[a.elevationKey] > elevationMap[b.elevationKey]) return 1;
          else if (elevationMap[a.elevationKey] < elevationMap[b.elevationKey]) return -1;
          return 0;
        })
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
