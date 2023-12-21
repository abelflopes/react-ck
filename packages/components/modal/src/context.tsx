import React from "react";

interface HeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  heading?: string;
}

export interface ModalContextValue {
  header: HeaderProps | undefined;
  footer: React.HTMLAttributes<HTMLElement> | undefined;
}

export interface ModalContextProps {
  setValue: (value: Partial<ModalContextValue>) => void;
}

export const themeContextDefaults: ModalContextProps = {
  setValue: () => undefined,
};

export const ModalContext = React.createContext<ModalContextProps>(themeContextDefaults);
