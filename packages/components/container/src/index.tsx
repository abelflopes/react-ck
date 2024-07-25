import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { useResponsiveProps, type ResponsiveProps } from "@react-ck/responsive";

/** Represents the possible variations for the Container component  */
type ContainerSpacing = "s" | "m" | "l" | "none";

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Container maximum width */
  size?: "s" | "m" | "l";
  /** Adds horizontal spacing to the container  */
  spacingX?: ContainerSpacing;
  /** Adds vertical spacing to the container  */
  spacingY?: ContainerSpacing;
}

export type ContainerProps = BaseProps & ResponsiveProps<BaseProps>;

/**
 * A wrapper used to build limit the with of given content, provide spacing and
 * alignment with the rest of the layout.
 * @param props - {@link ContainerProps}
 * @returns a React element
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
