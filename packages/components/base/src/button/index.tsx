import React, { isValidElement, useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import {
  getDisplayName,
  PolymorphicComponent,
  type ConsumerPolymorphicProps,
  type HTMLTag,
} from "@react-ck/react-utils";
import { Spinner } from "../spinner";

/**
 * Props interface for the Button component
 * @template T - HTML tag type that the button can be rendered as
 */
export interface ButtonProps<T extends HTMLTag = "button">
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ConsumerPolymorphicProps<T> {
  /** The visual theme of the button. Affects color scheme and overall appearance.
   * @default "primary"
   */
  skin?: "primary" | "secondary" | "negative";
  /** Determines the visual style variation within the chosen skin.
   * @default "default"
   */
  skinVariation?: "default" | "muted" | "bordered" | "ghost";
  /** Controls the button's size, affecting padding and overall dimensions.
   * @default "m"
   */
  size?: "s" | "m" | "l" | "xs";
  /** Icon element to be displayed within the button.
   * Can be any valid React node (SVG, icon component, etc).
   */
  icon?: React.ReactNode;
  /** Determines the icon's placement relative to the button text.
   * @default "after"
   */
  iconPosition?: "before" | "after";
  /** Reference to the root button element.
   * Useful for imperative actions or DOM measurements.
   */
  rootRef?: React.ForwardedRef<HTMLButtonElement>;
  /** When true, the button will expand to fill its container's width.
   * @default false
   */
  fullWidth?: boolean;
  /** When true, the button will show a loading state.
   * @default false
   */
  loading?: boolean;
}

/**
 * A versatile button component that supports multiple visual styles, sizes, and icon placements.
 * Can be rendered as different HTML elements through polymorphic behavior.
 *
 * @example
 * ```tsx
 * <Button skin="primary" size="m">Click me</Button>
 * <Button skin="secondary" icon={<Icon />} iconPosition="before">With Icon</Button>
 * ```
 *
 * @param props - Component props {@link ButtonProps}
 * @returns React element
 */

// eslint-disable-next-line complexity
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
  loading,
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
          loading && styles.loading,
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

      <span className={styles.loader}>
        <Spinner skin="text" size={size === "xs" || size === "s" ? "text" : "l"} />
      </span>
    </PolymorphicComponent>
  );
};
