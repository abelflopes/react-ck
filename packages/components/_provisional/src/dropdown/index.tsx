import React, { useEffect, useRef, useState } from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { ScrollableContainer } from "../scrollable-container";
import { Card } from "@react-ck/card";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useOnClickOutside } from "@react-ck/react-utils";

const defaultExclude: PositionEngineProps["exclude"] = ["left", "right", "end", "full"];

export interface DropdownProps {
  anchorRef: PositionEngineProps["anchorRef"];
  position?: PositionEngineProps["position"];
  excludeAutoPosition?: PositionEngineProps["exclude"];
  children?: React.ReactNode;
  open?: boolean;
  spacing?: "s" | "m" | "l" | "none";
  /** Ref for the root element */
  rootRef?: React.MutableRefObject<HTMLDivElement | null>;
  onClose?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Dropdown = ({
  anchorRef,
  excludeAutoPosition = defaultExclude,
  position = "auto",
  open = false,
  spacing = "m",
  rootRef,
  children,
  onClose,
  onFocus,
  onBlur,
}: Readonly<DropdownProps>): React.ReactNode => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(open);

  /** Close dropdown when clicked outside  */
  useOnClickOutside(open, [anchorRef, containerRef], () => {
    setInternalOpen(false);
    onClose?.();
  });

  // Sync external and internal states
  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  return (
    internalOpen && (
      <PositionEngine
        active={internalOpen}
        exclude={excludeAutoPosition}
        position={position}
        anchorRef={anchorRef}
        render={({ style }) => (
          <Layer elevation="overlay">
            <div
              ref={(r) => {
                if (rootRef) rootRef.current = r;
                containerRef.current = r;
              }}
              tabIndex={0}
              role="menu"
              style={style}
              className={styles.container}
              onFocus={onFocus}
              onBlur={onBlur}>
              <Card skin="shadowed" spacing="none" borderRadius="m">
                <ScrollableContainer
                  horizontal={false}
                  className={classNames(styles.content, styles[`spacing_${spacing}`])}>
                  {children}
                </ScrollableContainer>
              </Card>
            </div>
          </Layer>
        )}
      />
    )
  );
};
