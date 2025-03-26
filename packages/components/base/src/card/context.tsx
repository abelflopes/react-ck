import React from "react";

export interface CardContextValue {
  image: React.ImgHTMLAttributes<HTMLImageElement> | undefined;
}

export interface CardContextProps {
  setValue: (value: CardContextValue) => void;
}

export const CardContext = React.createContext<CardContextProps>({
  setValue: () => undefined,
});
