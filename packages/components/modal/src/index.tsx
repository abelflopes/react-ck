import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ModalContext, type ModalContextProps, type ModalContextValue } from "./context";
import { Card } from "@react-ck/card";
import { Overlay } from "@react-ck/overlay";
import { Icon } from "@react-ck/icon";
import { IconClose } from "@react-ck/icon/icons/IconClose";
import { Button } from "@react-ck/button";
import { Text } from "@react-ck/text";
import { Layer } from "@react-ck/layers";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";

/**
 * ModalProps interface represents the properties for the Modal component.
 * Extends React.HTMLAttributes<HTMLDivElement> to inherit HTMLDivElement attributes.
 */

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Determines whether the modal is open or closed */
  open?: boolean;
  /** Determines if the modal can be dismissed by clicking outside or close button  */
  dismissible?: boolean;
  onDismiss?: () => void;
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal

let openModals = 0;

/**
 * Modal is a full screen overlay that sits atop the page content.
 * It’s used to focus attention on an important task or message and requires user input to be dismissed.
 * @param props - {@link React.HTMLAttributes}
 * @returns a React element
 */

const Modal = ({
  open = true,
  dismissible = true,
  children,
  className,
  onDismiss,
  ...otherProps
}: Readonly<ModalProps>): React.ReactNode => {
  // Internal open state, allows component to be uncontrolled
  const [internalOpen, setInternalOpen] = useState(open);

  // State child compound components' props
  const [props, setProps] = useState<ModalContextValue>({
    header: undefined,
    footer: undefined,
  });

  // Define context properties from child compound components
  const setContextValue = useCallback<ModalContextProps["setValue"]>((value) => {
    setProps((v) => ({ ...v, ...value }));
  }, []);

  // Close callback
  const handleClose = useCallback(() => {
    if (!dismissible) return;
    setInternalOpen(false);
    onDismiss?.();
  }, [dismissible, onDismiss]);

  // Build context for child compound components
  const contextProps = useMemo<ModalContextProps>(
    () => ({
      setValue: setContextValue,
    }),
    [setContextValue],
  );

  // Synchronize internal state with external state
  useEffect(() => {
    console.log("setInternalOpen", open);

    setInternalOpen(open);

    if (!open) onDismiss?.();
  }, [onDismiss, open]);

  useEffect(() => {
    console.log("internalOpen", internalOpen);
  }, [internalOpen]);

  // Lock scroll if there are open modals
  useEffect(() => {
    if (internalOpen) openModals += 1;
    else openModals -= 1;

    if (openModals > 1) document.body.classList.add(`${styles.lock_scroll}`);
    else document.body.classList.remove(`${styles.lock_scroll}`);
  }, [internalOpen]);

  return (
    internalOpen && (
      <Layer elevation="overlay">
        <div {...otherProps} className={classNames(styles.root, className)}>
          <Overlay
            className={classNames(dismissible && styles.clickable_overlay)}
            onClick={handleClose}
          />

          <Card className={styles.card}>
            <ModalContext.Provider value={contextProps}>
              {props.header ? (
                <header
                  {...props.header}
                  className={classNames(styles.header, props.header.className)}>
                  <Text variation="h3" as="p" margin="none">
                    {props.header.heading}
                  </Text>

                  {dismissible ? (
                    <Button
                      skin="ghost"
                      icon={
                        <Icon>
                          <IconClose />
                        </Icon>
                      }
                      onClick={handleClose}
                    />
                  ) : null}
                </header>
              ) : null}

              <main className={styles.content}>{children}</main>

              {props.footer ? (
                <footer
                  {...props.footer}
                  className={classNames(styles.footer, props.footer.className)}
                />
              ) : null}
            </ModalContext.Provider>
          </Card>
        </div>
      </Layer>
    )
  );
};

Modal.Header = ModalHeader;

Modal.Footer = ModalFooter;

export { Modal, type ModalProps };
