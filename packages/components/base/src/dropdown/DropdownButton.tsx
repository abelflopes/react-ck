import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, type DropdownProps } from "./Dropdown";

export interface DropdownRenderProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface DropdownButtonRenderProps extends DropdownRenderProps {
  ref: React.RefObject<HTMLButtonElement | null>;
}

export interface DropdownButtonProps extends Omit<DropdownProps, "anchorRef"> {
  renderButton: (props: DropdownButtonRenderProps) => React.ReactNode;
  renderContent?: (props: DropdownRenderProps) => React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

/** A dropdown component with managed internal state that provides ease of use for common use cases. */

export const DropdownButton: React.FC<Readonly<DropdownButtonProps>> = ({
  renderButton,
  renderContent,
  open = false,
  onClose,
  onOpenChange,
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(open);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const internalOnClose = useCallback(() => {
    setInternalOpen(false);
    onClose?.();
  }, [onClose]);

  const internalOnOpen = useCallback(() => {
    setInternalOpen(true);
  }, []);

  const rendererProps = useMemo<DropdownRenderProps>(
    () => ({
      isOpen: internalOpen,
      open: internalOnOpen,
      close: internalOnClose,
    }),
    [internalOpen, internalOnOpen, internalOnClose],
  );

  const button = useMemo(
    () =>
      renderButton({
        ref: buttonRef,
        ...rendererProps,
      }),
    [renderButton, rendererProps],
  );

  const content = useMemo(() => renderContent?.(rendererProps), [renderContent, rendererProps]);

  useEffect(() => {
    onOpenChange?.(internalOpen);
  }, [internalOpen, onOpenChange]);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  return (
    <>
      {button}
      <Dropdown anchorRef={buttonRef} open={internalOpen} onClose={internalOnClose} {...props}>
        {children}
        {content}
      </Dropdown>
    </>
  );
};
