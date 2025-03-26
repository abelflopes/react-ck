import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { Card } from "../card";
import classNames from "classnames";

/**
 * Props for configuring the Tooltip component
 */
export interface TooltipProps {
  /** Reference to the element that triggers the tooltip */
  anchor: PositionEngineProps["anchorRef"];
  /** Preferred position of the tooltip relative to the anchor. Defaults to "auto" */
  position?: PositionEngineProps["position"];
  /** Content to display inside the tooltip */
  children?: React.ReactNode;
  /**
   * Controls tooltip visibility
   * @default undefined - tooltip opens/closes on hover
   * When true/false, hover behavior is disabled and visibility must be managed externally
   */
  open?: boolean;
}

/**
 * Displays floating content when hovering over or focusing an element
 * Uses PositionEngine for automatic positioning and Layer for proper stacking
 */
export const Tooltip = ({
  anchor,
  position = "auto",
  open = undefined,
  children,
}: Readonly<TooltipProps>): React.ReactNode => {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    const ref = anchor.current;

    if (open !== undefined) {
      setInternalOpen(open);
      return;
    }

    if (!ref) throw new Error("Tooltip anchor ref is required");

    let to: ReturnType<typeof setTimeout> | undefined = undefined;

    function handleMouseEnter(): void {
      clearTimeout(to);
      to = setTimeout(() => {
        setInternalOpen(true);
      }, 300);
    }

    function handleMouseLeave(): void {
      clearTimeout(to);
      setInternalOpen(false);
    }

    ref.addEventListener("mouseenter", handleMouseEnter);
    ref.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(to);
      ref.removeEventListener("mouseenter", handleMouseEnter);
      ref.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [anchor, open]);

  return (
    internalOpen && (
      <PositionEngine
        active={Boolean(internalOpen)}
        exclude={["full"]}
        position={position}
        anchorRef={anchor}
        render={({ style, position }) => (
          <Layer elevation="popup">
            <div style={style} className={classNames(styles.container, position)}>
              <Card skin="shadowed" spacing="none" className={styles.card} borderRadius="m">
                <div className={styles.content}>{children}</div>
              </Card>
            </div>
          </Layer>
        )}
      />
    )
  );
};
