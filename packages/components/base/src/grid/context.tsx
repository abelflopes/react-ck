import React from "react";

export interface GridContextProps {
  columnsCount: number;
  registerColumn: () => {
    deregister: () => void;
    index: number;
  };
}

export const GridContext = React.createContext<GridContextProps>({
  columnsCount: 0,
  registerColumn() {
    throw new Error("Grid context not initialized");
  },
});
