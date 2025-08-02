import React from "react";
import { Modal, type ModalProps } from "../modal";

/**
 * Props for configuring the Dialog component
 * Extends Modal props with simplified options for common dialog use cases
 */
export interface DialogProps
  extends Omit<ModalProps, "size" | "overlay" | "closeButton" | "dismissOnClickOutside"> {
  /** Optional heading text displayed at the top of the dialog */
  heading?: React.ReactNode;
  /** Optional actions (typically buttons) displayed at the bottom of the dialog */
  actions?: React.ReactNode;
}

/**
 * Simplified modal dialog for displaying content with optional header and footer actions
 * Pre-configured with small size and no overlay, close button, or outside click dismissal
 */
export const Dialog = ({
  heading,
  children,
  actions,
  ...otherProps
}: Readonly<DialogProps>): React.ReactElement => (
  <Modal
    size="s"
    overlay={false}
    closeButton={false}
    dismissOnClickOutside={false}
    layerGroup="dialog"
    {...otherProps}>
    {heading ? <Modal.Header bordered={false}>{heading}</Modal.Header> : null}

    {children}

    {actions ? <Modal.Footer bordered={false} actions={actions} /> : null}
  </Modal>
);
