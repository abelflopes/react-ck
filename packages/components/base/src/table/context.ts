import { createContext, useContext } from "react";

export interface TableContextProps {
  /** Specifies the visual style of the table  */
  skin: "default" | "bordered" | "bordered-row" | "bordered-column";
  /** Specifies the spacing between table elements  */
  spacing: "default" | "compact" | "none";
  /** Allows container to be scrollable and adds sticky headers  */
  scrollable: boolean;
}

export const TableContext = createContext<TableContextProps>({
  skin: "default",
  spacing: "default",
  scrollable: false,
});

export const useTableContext = (): TableContextProps => useContext(TableContext);
