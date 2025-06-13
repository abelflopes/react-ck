import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { useResponsiveProps, type ResponsiveProps } from "../responsive";

/** Available spacing options for container padding */
type ContainerSpacing = "none" | "s" | "m" | "l" | "xl";

/**
 * Base props interface for Container component.
 * Defines sizing and spacing options.
 */
interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint of the container.
   * @default "l"
   */
  size?: "s" | "m" | "l" | "xl" | "full";
  /** Horizontal padding on both sides.
   * @default "m"
   */
  spacingX?: ContainerSpacing;
  /** Vertical padding on top and bottom.
   * @default "none"
   */
  spacingY?: ContainerSpacing;
}

/** Props interface combining base props with responsive behavior */
export type ContainerProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * Layout component that provides consistent width constraints and spacing.
 * Supports responsive adjustments to size and padding.
 *
 * @example
 * ```tsx
 * <Container size="m" spacingY="l">
 *   <Content />
 * </Container>
 *
 * // With responsive props
 * <Container
 *   size="m"
 *   responsive={{
 *     s: { size: "s", spacingX: "s" },
 *     l: { size: "l", spacingX: "l" }
 *   }}
 * >
 *   <Content />
 * </Container>
 * ```
 *
 * @param props - Component props {@link ContainerProps}
 * @returns React element
 */

export const Container = ({
  responsive,
  ...baseProps
}: Readonly<ContainerProps>): React.ReactElement => {
  const { size, spacingX, spacingY, className, ...otherProps } = useResponsiveProps<BaseProps>({
    baseProps: {
      ...baseProps,
      size: baseProps.size ?? "l",
      spacingX: baseProps.spacingX ?? "m",
      spacingY: baseProps.spacingY ?? "none",
    },
    responsive,
  });

  return (
    <div
      className={classNames(
        styles.root,
        `${styles[`size_${size}`]}`,
        `${styles[`spacing_x_${spacingX}`]}`,
        `${styles[`spacing_y_${spacingY}`]}`,
        className,
      )}
      {...otherProps}
    />
  );
};
