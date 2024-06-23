import React, { isValidElement, useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import {
  getDisplayName,
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";

/**
 * Props for the Button component
 */
export interface ButtonProps<T extends HTMLTag = "button">
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ConsumerPolymorphicProps<T> {
  /** Defines the color scheme of the button */
  skin?: "primary" | "secondary" | "ghost" | "negative" | "bordered";
  /** Defines the scale of the button */
  size?: "s" | "m" | "l";
  /**
   * Content slot to receive an icon.
   * This can be any valid React node, allowing integration of icons or custom SVG components.
   */
  icon?: React.ReactNode;
  /** Ref for the root element */
  rootRef?: React.ForwardedRef<HTMLButtonElement>;
  /** Make button occupy whole available horizontal space */
  fullWidth?: boolean;
}

/**
 * Button is a clickable interactive element that triggers a response.
 * You can place text and icons inside of a button.
 * Buttons are often used for form submissions and to toggle elements into view.
 * @param props - {@link ButtonProps}
 * @returns a React element
 */

export const Button = <T extends HTMLTag>({
  as,
  skin = "primary",
  size = "m",
  icon,
  children,
  className,
  rootRef,
  fullWidth,
  ...otherProps
}: Readonly<ButtonProps<T>>): React.ReactElement => {
  const isIconOnly = useMemo(
    () => icon !== undefined && React.Children.count(children) === 0,
    [children, icon],
  );

  useEffect(() => {
    // Validate icon usage (icon should be set through specific prop)
    for (const i of React.Children.toArray(children).filter(isValidElement)) {
      const name = getDisplayName(i);
      if (name && name.toLowerCase().includes("icon"))
        throw new Error("Icons inside Button should be set with 'icon' prop");
    }
  }, [children]);

  return (
    <PolymorphicComponent
      as={as}
      fallback={[
        "button",
        {
          ref: rootRef,
          ...otherProps,
        },
      ]}
      commonProps={{
        className: classNames(
          styles.root,
          styles[skin],
          styles[`size-${size}`],
          {
            [`${styles["icon-only"]}`]: isIconOnly,
            [`${styles.fullwidth}`]: fullWidth,
          },
          className,
        ),
      }}>
      {icon && !isIconOnly ? <span className={styles.icon}>{icon}</span> : null}
      {children}
      {isIconOnly ? icon : null}
    </PolymorphicComponent>
  );
};
