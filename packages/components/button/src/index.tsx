import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defines the color scheme of the button */
  skin?: "primary" | "secondary";
  /**
   * Content slot to receive an icon.
   * This can be any valid React node, allowing integration of icons or custom SVG components.
   */
  icon?: React.ReactNode;
}

export const Button = ({
  skin = "primary",
  icon,
  children,
  className,
  ...otherProps
}: Readonly<ButtonProps>): React.ReactElement => (
  <button className={classNames(styles.root, styles[skin], className)} {...otherProps}>
    {icon && <span className={styles.icon}>{icon}</span>}
    {children}
  </button>
);
