import { useContext, useEffect } from "react";
import { ModalContext, type ModalContextValue } from "./context";

export const ModalFooter = (props: NonNullable<ModalContextValue["footer"]>): undefined => {
  const context = useContext(ModalContext);

  useEffect(() => {
    context.setValue({ footer: props });

    return () => {
      context.setValue({ footer: undefined });
    };
  }, [context, props]);
};
