import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { useResponsiveProps, type ResponsiveProps } from "../responsive";

type ElementProps = React.HTMLAttributes<HTMLDivElement>;

interface BaseProps extends ElementProps {
  spacing?: "s" | "m" | "l" | "none";
  align?: NonNullable<ElementProps["style"]>["alignItems"];
  direction?: NonNullable<ElementProps["style"]>["flexDirection"];
  justify?: NonNullable<ElementProps["style"]>["justifyContent"];
  wrap?: NonNullable<ElementProps["style"]>["flexWrap"];
}

type FlexProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * A container used to build flex layouts.
 * @param props - {@link FlexProps}
 * @returns a React element
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
