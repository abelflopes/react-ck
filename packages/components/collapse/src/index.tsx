import React from "react";
import styles from "./styles/index.module.scss";

export interface CollapseProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  /** The content to be displayed as the header of the collapse component  */
  header: NonNullable<React.ReactNode>;
}

export const Collapse = ({
  header,
  children,
  className,
  ...otherProps
}: Readonly<CollapseProps>): React.ReactElement => (
  <details {...otherProps}>
    <summary className={styles.header}>{header}</summary>
    {children}
  </details>
);
