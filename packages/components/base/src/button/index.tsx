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
  skin?: "primary" | "secondary" | "negative";
  /** Defines how the skin is applied */
  skinVariation?: "default" | "muted" | "bordered" | "ghost";
  /** Defines the scale of the button */
  size?: "s" | "m" | "l" | "xs";
  /**
   * Content slot to receive an icon.
   * This can be any valid React node, allowing integration of icons or custom SVG components.
   */
  icon?: React.ReactNode;
  /** Defines where icon should be placed */
  iconPosition?: "before" | "after";
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
  type = "button",
  skin = "primary",
  skinVariation = "default",
  size = "m",
  icon,
  iconPosition = "after",
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
      // use any icon display name instead of DISPLAY_NAMES const to have more coverage
      if (name?.toLowerCase().includes("icon"))
        throw new Error("Icons inside Button should be set with 'icon' prop");
    }
  }, [children]);

  return (
    <PolymorphicComponent
      as={as}
      fallback={[
        "button",
        {
          type,
          ref: rootRef,
          ...otherProps,
        },
      ]}
      commonProps={{
        className: classNames(
          styles.root,
          styles[`skin_${skin}`],
          styles[`skin_variation_${skinVariation}`],
          styles[`size-${size}`],
          {
            [`${styles["icon-only"]}`]: isIconOnly,
            [`${styles.fullwidth}`]: fullWidth,
          },
          className,
        ),
      }}>
      {icon && iconPosition === "before" && !isIconOnly ? (
        <span className={classNames(styles.icon, styles[`icon_${iconPosition}`])}>{icon}</span>
      ) : null}

      {children}

      {icon && iconPosition === "after" && !isIconOnly ? (
        <span className={classNames(styles.icon, styles[`icon_${iconPosition}`])}>{icon}</span>
      ) : null}

      {isIconOnly ? icon : null}
    </PolymorphicComponent>
  );
};
