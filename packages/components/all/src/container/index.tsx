import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

type ContainerVariation = "horizontal" | "vertical" | "small";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variation?: ContainerVariation | ContainerVariation[];
}

export const Container = ({
  variation = "horizontal",
  className,
  ...otherProps
}: Readonly<ContainerProps>): React.ReactElement => {
  const computedVariations = Array.isArray(variation) ? variation : [variation];

  return (
    <div
      className={classNames(
        styles.root,
        className,
        computedVariations.map((i) => styles[i]),
      )}
      {...otherProps}
    />
  );
};
