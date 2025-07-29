import React, { createContext, useContext } from "react";

interface BreadcrumbsDropdownProviderProps {
  isInDropdown: boolean;
}

const BreadcrumbsDropdownContext = createContext<BreadcrumbsDropdownProviderProps | undefined>(
  undefined,
);

export const useBreadcrumbsDropdownContext = () => useContext(BreadcrumbsDropdownContext);

const activeContext: BreadcrumbsDropdownProviderProps = {
  isInDropdown: true,
};

export const BreadcrumsDropdownContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <BreadcrumbsDropdownContext.Provider value={activeContext}>
      {children}
    </BreadcrumbsDropdownContext.Provider>
  );
};
