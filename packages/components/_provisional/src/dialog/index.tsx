import React from "react";
import { Modal, type ModalProps } from "../modal";

export interface DialogProps
  extends Omit<ModalProps, "size" | "overlay" | "closeButton" | "dismissOnClickOutside"> {
  heading?: string;
  actions?: React.ReactNode;
}

export const Dialog = ({
  heading,
  children,
  actions,
  ...otherProps
}: Readonly<DialogProps>): React.ReactElement => (
  <Modal size="s" overlay={false} closeButton={false} dismissOnClickOutside={false} {...otherProps}>
    {heading ? <Modal.Header heading={heading} /> : null}

    {children}

    {actions ? <Modal.Footer>{actions}</Modal.Footer> : null}
  </Modal>
);
