import { useContext, useEffect } from "react";
import { ModalContext, type ModalContextValue } from "./context";

export type ModalFooterProps = ModalContextValue["footer"];

export const ModalFooter = (props: NonNullable<ModalFooterProps>): undefined => {
  const context = useContext(ModalContext);

  useEffect(() => {
    context.setValue({ footer: props });

    return () => {
      context.setValue({ footer: undefined });
    };
  }, [context, props]);
};
