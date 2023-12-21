import { useContext, useEffect } from "react";
import { ModalContext, type ModalContextValue } from "./context";

export const ModalHeader = (props: NonNullable<ModalContextValue["header"]>): undefined => {
  const context = useContext(ModalContext);

  useEffect(() => {
    context.setValue({ header: props });

    return () => {
      context.setValue({ header: undefined });
    };
  }, [context, props]);
};
