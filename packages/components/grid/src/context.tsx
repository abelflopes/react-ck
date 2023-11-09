import React, { useContext } from "react";

export interface GridContextProps {
  columnsCount: number;
  registerColumn: () => () => void;
}

export const themeContextDefaults: GridContextProps = {
  columnsCount: 0,
  registerColumn() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  },
};

export const GridContext = React.createContext<GridContextProps>(themeContextDefaults);

export const useGridContext = (): GridContextProps => useContext(GridContext);
