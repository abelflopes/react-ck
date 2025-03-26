import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for configuring the Divider component
 */
export interface DividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, "children"> {
  /** Orientation of the divider line. Defaults to "horizontal" */
  type?: "vertical" | "horizontal";
}

/**
 * Visual separator for content sections
 * Renders as an HR element with configurable orientation
 */
export const Divider = ({
  type = "horizontal",
  className,
  ...otherProps
}: Readonly<DividerProps>): React.ReactElement => (
  <hr className={classNames(styles.root, styles[type], className)} {...otherProps} />
);
