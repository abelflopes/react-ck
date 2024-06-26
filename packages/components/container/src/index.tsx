import React, { useMemo } from "react";
import * as styles from "./styles/index.module.scss";
import classNames from "classnames";

/** Represents the possible variations for the Container component  */
type ContainerVariation =
  /** Reduces the spacing */
  | "small"
  /** Increases the spacing */
  | "big";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specifies the variation(s) of the container  */
  variation?: ContainerVariation | ContainerVariation[];
  /** Adds horizontal spacing to the container  */
  spacingX?: boolean;
  /** Adds vertical spacing to the container  */
  spacingY?: boolean;
}

/**
 * A wrapper used to build limit the with of given content, provide spacing and
 * alignment with the rest of the layout.
 * @param props - {@link ContainerProps}
 * @returns a React element
 */

export const Container = ({
  variation,
  spacingX = true,
  spacingY,
  className,
  ...otherProps
}: Readonly<ContainerProps>): React.ReactElement => {
  const computedVariations = useMemo(() => {
    if (!variation) return [];
    else if (Array.isArray(variation)) return variation;
    return [variation];
  }, [variation]);

  return (
    <div
      className={classNames(
        styles.root,
        { [`${styles.horizontal}`]: spacingX, [`${styles.vertical}`]: spacingY },
        computedVariations.map((index) => styles[index]),
        className,
      )}
      {...otherProps}
    />
  );
};
