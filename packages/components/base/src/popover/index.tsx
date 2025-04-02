import React from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { ScrollableContainer } from "../scrollable-container";
import { Card } from "../card";
import styles from "./index.module.scss";

/**
 * Props for configuring the Popover component
 */
export interface PopoverProps {
  /** Reference to the element that triggers the popover */
  anchor: PositionEngineProps["anchorRef"];
  /** Preferred position relative to anchor. Defaults to "auto" */
  position?: PositionEngineProps["position"];
  /** Content to display inside the popover */
  children?: React.ReactNode;
  /** Whether the popover is visible */
  open?: boolean;
}

/**
 * Floating card that displays content relative to an anchor element
 * Supports automatic positioning and scrollable content
 */
export const Popover = ({
  anchor,
  position = "auto",
  open,
  children,
}: Readonly<PopoverProps>): React.ReactNode =>
  open && (
    <PositionEngine
      active={open}
      exclude={["left", "right", "end"]}
      position={position}
      anchorRef={anchor}
      render={({ style }) => (
        <Layer elevation="overlay" group="popover">
          <div style={style} className={styles.container}>
            <Card skin="shadowed" spacing="none" className={styles.card} borderRadius="m">
              <ScrollableContainer horizontal={false} className={styles.content}>
                {children}
              </ScrollableContainer>
            </Card>
          </div>
        </Layer>
      )}
    />
  );
