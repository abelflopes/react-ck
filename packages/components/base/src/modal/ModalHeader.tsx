import { useContext, useEffect } from "react";
import { ModalContext, type ModalContextValue } from "./context";

export type ModalHeaderProps = ModalContextValue["header"];

export const ModalHeader = (props: NonNullable<ModalHeaderProps>): undefined => {
  const context = useContext(ModalContext);

  useEffect(() => {
    context.setValue({ header: props });

    return () => {
      context.setValue({ header: undefined });
    };
  }, [context, props]);
};
