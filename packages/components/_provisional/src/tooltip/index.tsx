import styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { Card } from "@react-ck/card";
import classNames from "classnames";

export interface TooltipProps {
  anchor: PositionEngineProps["anchorRef"];
  position?: PositionEngineProps["position"];
  children?: React.ReactNode;
  /**
   * The tooltip will open/close on hover by default,
   * if you pass true/false, this behavior will be overridden and should be managed by the consumer
   */
  open?: boolean;
}

export const Tooltip = ({
  anchor,
  position = "auto",
  open = false,
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
        active={open}
        exclude={["full"]}
        position={position}
        anchorRef={anchor}
        render={({ style, position }) => (
          <Layer elevation="popup">
            <div style={style} className={classNames(styles.container, position)}>
              <Card skin="shadowed" spacing="none" className={styles.card}>
                <div className={styles.content}>{children}</div>
              </Card>
            </div>
          </Layer>
        )}
      />
    )
  );
};
