import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Text } from "@react-ck/text";

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * The Empty State component serves as a crucial element in React applications,
 * providing a clean and user-friendly experience when no content is available.
 * @param props - {@link EmptyStateProps}
 * @returns a React element
 */

export const EmptyState = ({
  className,
  children,
  ...otherProps
}: Readonly<EmptyStateProps>): React.ReactElement => (
  <div className={classNames(styles.root, className)} {...otherProps}>
    {children}
  </div>
);
