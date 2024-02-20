import React from "react";

export interface GridContextProps {
  columnsCount: number;
  registerColumn: () => () => void;
}

export const GridContext = React.createContext<GridContextProps>({
  columnsCount: 0,
  registerColumn() {
    return (): ReturnType<GridContextProps["registerColumn"]> => () => {
      throw new Error("Grid context not initialized");
    };
  },
});
