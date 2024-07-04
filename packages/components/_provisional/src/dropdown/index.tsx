import React from "react";
import { Layer } from "@react-ck/layers";
import { PositionEngine, type PositionEngineProps } from "../position-engine";
import { ScrollableContainer } from "../scrollable-container";
import { Card } from "@react-ck/card";
import styles from "./index.module.scss";
import classNames from "classnames";

const defaultExclude: PositionEngineProps["exclude"] = ["left", "right", "end", "full"];

export interface DropdownProps {
  anchorRef: PositionEngineProps["anchorRef"];
  position?: PositionEngineProps["position"];
  excludeAutoPosition?: PositionEngineProps["exclude"];
  children?: React.ReactNode;
  open?: boolean;
  spacing?: "m" | "none";
  /** Ref for the root element */
  rootRef?: React.RefObject<HTMLDivElement>;
}

export const Dropdown = ({
  anchorRef,
  excludeAutoPosition = defaultExclude,
  position = "auto",
  open,
  spacing = "m",
  rootRef,
  children,
}: Readonly<DropdownProps>): React.ReactNode =>
  open && (
    <PositionEngine
      exclude={excludeAutoPosition}
      position={position}
      anchorRef={anchorRef}
      render={({ style }) => (
        <Layer elevation="popup">
          <div ref={rootRef} style={style} className={styles.container}>
            <Card skin="shadowed" spacing="none">
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
  );
