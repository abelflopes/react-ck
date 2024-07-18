import { createContext, useContext } from "react";

export interface TableContextProps {
  /** Specifies the visual style of the table  */
  skin: "default" | "bordered";
  /** Allows container to be scrollable and adds sticky headers  */
  scrollable: boolean;
}

export const TableContext = createContext<TableContextProps>({
  skin: "default",
  scrollable: false,
});

export const useTableContext = (): TableContextProps => useContext(TableContext);
