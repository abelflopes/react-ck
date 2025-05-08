import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for configuring the Divider component
 */
export interface DividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, "children"> {
  /** Orientation of the divider line. Defaults to "horizontal" */
  type?: "vertical" | "horizontal";
  /** Spacing around the divider. Defaults to "medium" */
  spacing?: "none" | "s" | "m" | "l";
}

/**
 * Visual separator for content sections
 * Renders as an HR element with configurable orientation and spacing
 */
export const Divider = ({
  type = "horizontal",
  spacing = "m",
  className,
  ...otherProps
}: Readonly<DividerProps>): React.ReactElement => (
  <hr
    className={classNames(styles.root, styles[type], styles[`spacing_${spacing}`], className)}
    {...otherProps}
  />
);
