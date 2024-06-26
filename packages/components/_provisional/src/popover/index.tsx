import React from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { ScrollableContainer } from "../scrollable-container";
import { Card } from "@react-ck/card";
import * as styles from "./index.module.scss";

export interface PopoverProps {
  anchor: PositionEngineProps["anchorRef"];
  position?: PositionEngineProps["position"];
  children?: React.ReactNode;
  open?: boolean;
}

export const Popover = ({
  anchor,
  position = "auto",
  open,
  children,
}: Readonly<PopoverProps>): React.ReactNode =>
  open && (
    <PositionEngine
      exclude={["left", "right", "end"]}
      position={position}
      anchorRef={anchor}
      render={({ style }) => (
        <Layer elevation="popup">
          <div style={style} className={styles.container}>
            <Card skin="shadowed" spacing="none" className={styles.card}>
              <ScrollableContainer horizontal={false} className={styles.content}>
                {children}
              </ScrollableContainer>
            </Card>
          </div>
        </Layer>
      )}
    />
  );
