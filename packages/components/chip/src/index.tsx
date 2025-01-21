import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Specifies the visual style of the chip  */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive" | "info";
  variation?: "filled" | "bordered";
  /**
   * Content slot to receive an icon.
   * This can be any valid React node, allowing integration of icons or custom SVG components.
   */
  icon?: React.ReactNode;
}

/**
 * Chip is a compact label that appears beside a primary interface area which is used to
 * represent status or metadata for that area.
 * @param props - {@link ChipProps}
 * @returns a React element
 */

export const Chip = ({
  skin = "neutral",
  variation = "filled",
  icon,
  children,
  className,
  ...otherProps
}: Readonly<ChipProps>): React.ReactElement => (
  <span
    {...otherProps}
    className={classNames(
      styles.root,
      styles[`skin_${skin}`],
      styles[`variation_${variation}`],
      className,
    )}>
    {icon}

    {children}
  </span>
);
