import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, type DropdownProps } from "./Dropdown";

export interface DropdownButtonRenderProps {
  ref: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export interface DropdownButtonProps extends Omit<DropdownProps, "anchorRef"> {
  renderButton: (props: DropdownButtonRenderProps) => React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const DropdownButton: React.FC<Readonly<DropdownButtonProps>> = ({
  renderButton,
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

  const button = useMemo(
    () =>
      renderButton({
        ref: buttonRef,
        isOpen: internalOpen,
        open: internalOnOpen,
        close: internalOnClose,
      }),
    [renderButton, internalOpen, internalOnOpen, internalOnClose],
  );

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
      </Dropdown>
    </>
  );
};
