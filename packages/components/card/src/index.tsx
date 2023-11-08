import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React from "react";

export const Card = ({
  children,
  className,
  ...otherProps
}: Readonly<React.HTMLAttributes<HTMLDivElement>>): React.ReactElement => (
  <div {...otherProps} className={classNames(styles.root, className)}>
    {children}
  </div>
);
