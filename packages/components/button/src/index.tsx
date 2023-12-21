import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Defines the color scheme of the button */
  skin?: "primary" | "secondary" | "ghost";
  /**
   * Content slot to receive an icon.
   * This can be any valid React node, allowing integration of icons or custom SVG components.
   */
  icon?: React.ReactNode;
}

/**
 * Button is a clickable interactive element that triggers a response.
 * You can place text and icons inside of a button.
 * Buttons are often used for form submissions and to toggle elements into view.
 * @param props - {@link ButtonProps}
 * @returns a React element
 */

export const Button = ({
  skin = "primary",
  icon,
  children,
  className,
  ...otherProps
}: Readonly<ButtonProps>): React.ReactElement => {
  const isIconOnly = useMemo(
    () => icon !== undefined && React.Children.count(children) === 0,
    [children, icon],
  );

  return (
    <button
      className={classNames(
        styles.root,
        styles[skin],
        {
          [`${styles["icon-only"]}`]: isIconOnly,
        },
        className,
      )}
      {...otherProps}>
      {icon && !isIconOnly && <span className={styles.icon}>{icon}</span>}
      {children}
      {isIconOnly && icon}
    </button>
  );
};
