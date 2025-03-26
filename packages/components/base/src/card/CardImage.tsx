import { useContext, useEffect } from "react";
import { CardContext, type CardContextValue } from "./context";

/**
 * Image component for use within a Card.
 * Must be used as a direct child of Card component.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Image src="image.jpg" alt="Description" />
 * </Card>
 * ```
 *
 * @param props - Standard HTML img attributes
 */
export const CardImage = (props: NonNullable<CardContextValue["image"]>): undefined => {
  const context = useContext(CardContext);

  useEffect(() => {
    context.setValue({ image: props });

    return () => {
      context.setValue({ image: undefined });
    };
  }, [context, props]);
};
