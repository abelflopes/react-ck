import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

/**
 * Props interface for the Chip component.
 * Defines visual and interactive options for compact labels.
 */
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual theme affecting the chip's appearance.
   * @default "neutral"
   */
  skin?: "neutral" | "primary" | "negative" | "average" | "positive" | "info";
  /** Style variation of the chip.
   * @default "filled"
   */
  variation?: "filled" | "bordered";
  /** Interactive behavior of the chip.
   * - click: Enables click interactions and hover states
   */
  interaction?: "click";
  /** Icon element displayed before the content.
   * Can be any valid React node (SVG, icon component, etc).
   */
  icon?: React.ReactNode;
}

/**
 * Compact label component for displaying metadata, filters, or selections.
 * Supports icons and interactive states.
 *
 * @example
 * ```tsx
 * <Chip skin="primary" icon={<Icon />}>Label</Chip>
 * <Chip skin="positive" variation="bordered">Active</Chip>
 * ```
 *
 * @param props - Component props {@link ChipProps}
 * @returns React element
 */

export const Chip = ({
  skin = "neutral",
  variation = "filled",
  interaction,
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
      styles[`interaction_${interaction}`],
      className,
    )}>
    {icon}

    {children}
  </span>
);
