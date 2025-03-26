import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, "children"> {
  /** Specifies the orientation of the divider */
  type?: "vertical" | "horizontal";
}

/**
 * Divider is a separator between sections of content or groups of items.
 * @param props - {@link DividerProps}
 * @returns a React element
 */

export const Divider = ({
  type = "horizontal",
  className,
  ...otherProps
}: Readonly<DividerProps>): React.ReactElement => (
  <hr className={classNames(styles.root, styles[type], className)} {...otherProps} />
);
