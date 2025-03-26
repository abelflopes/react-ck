import React from "react";

export interface DockContextProps {
  expanded: boolean;
}

export const DockContext = React.createContext<DockContextProps>({
  expanded: false,
});
