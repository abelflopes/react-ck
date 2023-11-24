import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Select is a type of input that allows users to choose one or more options from a list of choices.
 * The options are hidden by default and revealed when a user interacts with an element. It shows the currently selected option in its default collapsed state.
 * @param props - {@link SelectProps}
 * @returns a React element
 */

export const Select = ({ className, ...props }: Readonly<SelectProps>): React.ReactElement => (
  <select {...props} className={classNames(className, styles.root)} />
);
