import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export type SnippetProps = React.HTMLAttributes<HTMLElement>;

export const Snippet = ({
  className,
  ...otherProps
}: Readonly<SnippetProps>): React.ReactElement => (
  <code className={classNames(className, styles.root)} {...otherProps} />
);
