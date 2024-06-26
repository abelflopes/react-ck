import React from "react";

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  heading?: React.ReactNode;
}

export interface ModalContextValue {
  header: HeaderProps | undefined;
  footer: React.HTMLAttributes<HTMLElement> | undefined;
}

export interface ModalContextProps {
  setValue: (value: Partial<ModalContextValue>) => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
  setValue: () => {
    throw new Error("modal context not defined");
  },
});
