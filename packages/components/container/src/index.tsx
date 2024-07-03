import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/** Represents the possible variations for the Container component  */
type ContainerSpacing = "s" | "m" | "l" | "none";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Container maximum width */
  size?: "s" | "m" | "l";
  /** Adds horizontal spacing to the container  */
  spacingX?: ContainerSpacing;
  /** Adds vertical spacing to the container  */
  spacingY?: ContainerSpacing;
}

/**
 * A wrapper used to build limit the with of given content, provide spacing and
 * alignment with the rest of the layout.
 * @param props - {@link ContainerProps}
 * @returns a React element
 */

export const Container = ({
  size = "l",
  spacingX = "m",
  spacingY = "none",
  className,
  ...otherProps
}: Readonly<ContainerProps>): React.ReactElement => (
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
