import React from "react";

export type HeaderProps = React.HTMLAttributes<HTMLElement>;

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  actions?: React.ReactNode;
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
