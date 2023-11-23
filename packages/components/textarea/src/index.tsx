import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Textarea is a form element that accepts multiple lines of text.
 * @param props - {@link TextareaProps}
 * @returns a React element
 */

export const Textarea = ({ className, ...props }: Readonly<TextareaProps>): React.ReactElement => (
  <textarea {...props} className={classNames(className, styles.root)} />
);
