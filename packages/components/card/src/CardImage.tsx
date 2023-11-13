import { useContext, useEffect } from "react";
import { CardContext, type CardContextValue } from "./context";

export const CardImage = (props: NonNullable<CardContextValue["image"]>): undefined => {
  const context = useContext(CardContext);

  useEffect(() => {
    context.setValue({ image: props });

    return () => {
      context.setValue({ image: undefined });
    };
  }, [props]);
};
