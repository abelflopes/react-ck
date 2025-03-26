import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useResponsiveProps, type ResponsiveProps } from "../responsive";

type ElementProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Base configuration for the Flex component
 */
interface BaseProps extends ElementProps {
  /** Space between flex items. Defaults to "m" */
  spacing?: "s" | "m" | "l" | "none";
  /** Alignment of items on the cross axis. Defaults to "center" */
  align?: NonNullable<ElementProps["style"]>["alignItems"];
  /** Primary axis direction. Defaults to "row" */
  direction?: NonNullable<ElementProps["style"]>["flexDirection"];
  /** Alignment of items on the main axis. Defaults to "center" */
  justify?: NonNullable<ElementProps["style"]>["justifyContent"];
  /** How items wrap when they overflow. Defaults to "wrap" */
  wrap?: NonNullable<ElementProps["style"]>["flexWrap"];
}

/** Props for the Flex component, supporting responsive behavior */
type FlexProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * Flexible layout container using CSS flexbox
 * Supports responsive props and common flex layout options
 */
const Flex = ({ responsive, ...baseProps }: Readonly<FlexProps>): React.ReactElement => {
  const { spacing, align, direction, justify, wrap, className, style, ...otherProps } =
    useResponsiveProps<BaseProps>({
      baseProps: {
        ...baseProps,
        spacing: baseProps.spacing ?? "m",
        align: baseProps.align ?? "center",
        justify: baseProps.justify ?? "center",
        direction: baseProps.direction ?? "row",
        wrap: baseProps.wrap ?? "wrap",
      },
      responsive,
    });

  return (
    <div
      className={classNames(styles.root, styles[`spacing_${spacing}`], className)}
      style={{
        ...style,
        ...{ "--align": align, "--direction": direction, "--justify": justify, "--wrap": wrap },
      }}
      {...otherProps}
    />
  );
};

export { Flex, type FlexProps };
