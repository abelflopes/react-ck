import React from "react";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  actions?: React.ReactNode;
  bordered?: boolean;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  actions?: React.ReactNode;
  bordered?: boolean;
}

export interface ModalContextValue {
  header: HeaderProps | undefined;
  footer: FooterProps | undefined;
}

export interface ModalContextProps {
  setValue: (value: Partial<ModalContextValue>) => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
  setValue: () => {
    throw new Error("modal context not defined");
  },
});
