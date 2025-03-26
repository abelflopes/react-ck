import React from "react";

/** Internal state for the Card component's image */
export interface CardContextValue {
  /** Image props to be rendered at the top of the card */
  image: React.ImgHTMLAttributes<HTMLImageElement> | undefined;
}

/** Context props for managing Card's internal state */
export interface CardContextProps {
  /** Updates the Card's internal state */
  setValue: (value: CardContextValue) => void;
}

/** Context for managing Card's image state */
export const CardContext = React.createContext<CardContextProps>({
  setValue: () => undefined,
});
