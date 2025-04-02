import React, { useEffect, useRef, useState } from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { ScrollableContainer } from "../scrollable-container";
import { Card } from "../card";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useOnClickOutside } from "@react-ck/react-utils";

/** Default positions to exclude from auto-positioning */
const defaultExclude: PositionEngineProps["exclude"] = ["left", "right", "end", "full"];

/**
 * Props interface for the Dropdown component.
 * Provides positioning and display options for dropdown content.
 */
export interface DropdownProps {
  /** Reference to the element the dropdown should be positioned relative to */
  anchorRef: PositionEngineProps["anchorRef"];
  /** Fixed position or "auto" for automatic positioning
   * @default "auto"
   */
  position?: PositionEngineProps["position"];
  /** Positions to exclude from auto-positioning
   * @default ["left", "right", "end", "full"]
   */
  excludeAutoPosition?: PositionEngineProps["exclude"];
  /** Content to be displayed in the dropdown */
  children?: React.ReactNode;
  /** Controls dropdown visibility
   * @default false
   */
  open?: boolean;
  /** Internal padding of the dropdown content
   * @default "m"
   */
  spacing?: "s" | "m" | "l" | "none";
  /** Reference to the dropdown's root element.
   * Useful for imperative actions or measurements.
   */
  rootRef?: React.MutableRefObject<HTMLDivElement | null>;
  /** Called when the dropdown should close (e.g., click outside) */
  onClose?: () => void;
  /** Called when the dropdown receives focus */
  onFocus?: () => void;
  /** Called when the dropdown loses focus */
  onBlur?: () => void;
}

/**
 * Floating container component that displays content relative to an anchor element.
 * Handles positioning, scrolling, and click-outside behavior.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   anchorRef={buttonRef}
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 * >
 *   <Menu>
 *     <Menu.Item>Option 1</Menu.Item>
 *     <Menu.Item>Option 2</Menu.Item>
 *   </Menu>
 * </Dropdown>
 * ```
 *
 * @param props - Component props {@link DropdownProps}
 * @returns React element
 */
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
          <Layer elevation="overlay" group="dropdown">
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
