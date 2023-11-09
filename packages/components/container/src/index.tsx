import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/** Represents the possible variations for the Container component  */
type ContainerVariation =
  /** reduces the spacing */
  | "small"
  /** increases the spacing */
  | "big";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the variation(s) of the container  */
  variation?: ContainerVariation | ContainerVariation[];
  /** Adds horizontal spacing to the container  */
  spacingX?: boolean;
  /** Adds vertical spacing to the container  */
  spacingY?: boolean;
}

export const Container = ({
  variation = [],
  spacingX = true,
  spacingY,
  className,
  ...otherProps
}: Readonly<ContainerProps>): React.ReactElement => {
  const computedVariations = Array.isArray(variation) ? variation : [variation];

  return (
    <div
      className={classNames(
        styles.root,
        { [`${styles.horizontal}`]: spacingX, [`${styles.vertical}`]: spacingY },
        computedVariations?.map((index) => styles[index]),
        className,
      )}
      {...otherProps}
    />
  );
};
