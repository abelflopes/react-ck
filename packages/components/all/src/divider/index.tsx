import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  type?: "vertical" | "horizontal";
}

export const Divider = ({
  type = "horizontal",
  className,
  ...otherProps
}: Readonly<DividerProps>): React.ReactElement => (
  <hr className={classNames(styles.root, styles[type], className)} {...otherProps} />
);
