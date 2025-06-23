import styles from "./index.module.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { Card } from "../card";
import classNames from "classnames";

/** Default positions to exclude from auto-positioning */
const defaultExclude: PositionEngineProps["exclude"] = ["full"];

/**
 * Props for configuring the Tooltip component
 */
export interface TooltipProps {
  /** Reference to the element that triggers the tooltip */
  anchor: PositionEngineProps["anchorRef"];
  /** Preferred position of the tooltip relative to the anchor. Defaults to "auto" */
  position?: PositionEngineProps["position"];
  /** Positions to exclude from auto-positioning */
  excludeAutoPosition?: PositionEngineProps["exclude"];
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
  excludeAutoPosition = defaultExclude,
  open = undefined,
  children,
}: Readonly<TooltipProps>): React.ReactNode => {
  const [internalOpen, setInternalOpen] = useState(open);

  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearTimeouts = useCallback(() => {
    clearTimeout(closeTimeoutRef.current);
    clearTimeout(openTimeoutRef.current);
  }, []);

  const handleOpen = useCallback(() => {
    // Workaround to make sure the open is handled after the mouseleave of anchor element is fired
    requestAnimationFrame(() => {
      clearTimeouts();

      openTimeoutRef.current = setTimeout(() => {
        setInternalOpen(true);
      }, 300);
    });
  }, [clearTimeouts]);

  const handleClose = useCallback(() => {
    clearTimeouts();

    closeTimeoutRef.current = setTimeout(() => {
      setInternalOpen(false);
    }, 100);
  }, [clearTimeouts]);

  useEffect(() => {
    if (open !== undefined) setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    const ref = anchor.current;

    if (!ref) throw new Error("Tooltip anchor ref is required");

    ref.addEventListener("mouseenter", handleOpen);
    ref.addEventListener("mouseleave", handleClose);

    return () => {
      ref.removeEventListener("mouseenter", handleOpen);
      ref.removeEventListener("mouseleave", handleClose);
    };
  }, [anchor, handleClose, handleOpen]);

  useEffect(
    () => () => {
      clearTimeouts();
    },
    [clearTimeouts],
  );

  return (
    internalOpen && (
      <PositionEngine
        active={Boolean(internalOpen)}
        exclude={excludeAutoPosition}
        position={position}
        anchorRef={anchor}
        render={({ style, position }) => (
          <Layer elevation="popup" group="tooltip">
            <div
              style={style}
              className={classNames(styles.container, position)}
              onMouseLeave={handleClose}
              onMouseEnter={handleOpen}>
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
