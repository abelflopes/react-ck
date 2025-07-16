import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dropdown, type DropdownProps } from "./Dropdown";

export interface DropdownButtonRenderProps {
  ref: React.RefObject<HTMLButtonElement>;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface DropdownButtonProps extends Omit<DropdownProps, "anchorRef"> {
  readonly renderButton: (props: DropdownButtonRenderProps) => React.ReactNode;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  renderButton,
  open = false,
  onClose,
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(open);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const internalOnClose = useCallback(() => {
    setInternalOpen(false);
    onClose?.();
  }, [onClose]);

  const button = useMemo(
    () =>
      renderButton({
        ref: buttonRef,
        open: internalOpen,
        onOpen: () => {
          setInternalOpen(true);
        },
        onClose: internalOnClose,
      }),
    [renderButton, internalOpen, internalOnClose],
  );

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
