import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

type ContainerVariation = "small" | "big";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variation?: ContainerVariation | ContainerVariation[];
  spacingX?: boolean;
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
