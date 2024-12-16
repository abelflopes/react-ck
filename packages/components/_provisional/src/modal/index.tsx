import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ModalContext, type ModalContextProps, type ModalContextValue } from "./context";
import { Overlay, type OverlayProps } from "@react-ck/overlay";
import { Icon } from "@react-ck/icon";
import { IconClose } from "@react-ck/icon/icons/IconClose";
import { Button } from "@react-ck/button";
import { Text } from "@react-ck/text";
import { Layer } from "@react-ck/layers";
import { ScrollableContainer } from "../scrollable-container";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";

/**
 * ModalProps interface represents the properties for the Modal component.
 * Extends React.HTMLAttributes<HTMLDivElement> to inherit HTMLDivElement attributes.
 */

interface ModalProps extends Omit<OverlayProps, "skin"> {
  /** Modal width */
  size?: "s" | "m" | "l" | "xl" | "full";
  /** Modal height */
  sizeVariation?: "normal" | "full-height";
  /** Dismiss Callback, also determines if the modal can be dismissed by clicking outside or close button  */
  onDismiss?: () => void;
  /** Trigger dismiss when clicking outside of the modal wrapper */
  dismissOnClickOutside?: boolean;
  /** Changes visibility of close button */
  closeButton?: boolean;
  /** Changes visibility of overlay */
  overlay?: boolean;
  /** Toggle visibility of the modal */
  open?: boolean;
}

// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal

// TODO: create scroll lock utility
let openModals = 0;

/**
 * Modal is a full screen overlay that sits atop the page content.
 * It’s used to focus attention on an important task or message and requires user input to be dismissed.
 * @param props - {@link React.HTMLAttributes}
 * @returns a React element
 */

const Modal = ({
  size = "m",
  sizeVariation = "normal",
  children,
  className,
  onDismiss,
  dismissOnClickOutside = true,
  closeButton = true,
  overlay = true,
  open = true,
  ...otherProps
}: Readonly<ModalProps>): React.ReactNode => {
  // State child compound components' props
  const [props, setProps] = useState<ModalContextValue>({
    header: undefined,
    footer: undefined,
  });

  // Define context properties from child compound components
  const setContextValue = useCallback<ModalContextProps["setValue"]>((value) => {
    setProps((v) => ({ ...v, ...value }));
  }, []);

  // Build context for child compound components
  const contextProps = useMemo<ModalContextProps>(
    () => ({
      setValue: setContextValue,
    }),
    [setContextValue],
  );

  // Lock scroll if there are open modals
  useEffect(() => {
    if (!open) return;

    openModals += 1;

    if (openModals >= 1) document.body.classList.add(`${styles.lock_scroll}`);

    return () => {
      openModals -= 1;

      if (openModals === 0) document.body.classList.remove(`${styles.lock_scroll}`);
    };
  }, [open]);

  /* eslint-disable jsx-a11y/no-static-element-interactions  -- used only to stop click propagation on modal card*/
  /* eslint-disable jsx-a11y/click-events-have-key-events  -- used only to stop click propagation on modal card* */

  return (
    <Layer elevation="overlay">
      {open ? (
        <Overlay
          {...otherProps}
          blur={overlay}
          skin={overlay ? "dark" : "transparent"}
          className={classNames(
            styles.root,
            dismissOnClickOutside && onDismiss && styles.clickable_overlay,
            className,
          )}
          onClick={(e) => {
            if (dismissOnClickOutside) onDismiss?.();
            otherProps.onClick?.(e);
          }}>
          <div
            className={classNames(
              styles.card,
              `${styles[`size_${size}`]}`,
              `${styles[`size_var_${sizeVariation}`]}`,
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <ModalContext.Provider value={contextProps}>
              {props.header ? (
                <header
                  {...props.header}
                  className={classNames(styles.header, props.header.className)}>
                  <Text variation="h3" as="p" margin="none">
                    {props.header.heading}
                  </Text>

                  {closeButton && onDismiss ? (
                    <Button
                      skin="secondary"
                      skinVariation="ghost"
                      icon={
                        <Icon>
                          <IconClose />
                        </Icon>
                      }
                      onClick={onDismiss}
                    />
                  ) : null}
                </header>
              ) : null}

              <ScrollableContainer className={styles.content}>{children}</ScrollableContainer>

              {props.footer ? (
                <footer
                  {...props.footer}
                  className={classNames(styles.footer, props.footer.className)}
                />
              ) : null}
            </ModalContext.Provider>
          </div>
        </Overlay>
      ) : null}
    </Layer>
  );

  /* eslint-enable jsx-a11y/no-static-element-interactions */
  /* eslint-enable jsx-a11y/click-events-have-key-events */
};

Modal.Header = ModalHeader;

Modal.Footer = ModalFooter;

export { Modal, type ModalProps };
