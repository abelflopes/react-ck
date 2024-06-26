import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { FormField, type FormFieldProps } from "@react-ck/form-field";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: FormFieldProps["label"];
  skin?: FormFieldProps["skin"];
  description?: FormFieldProps["description"];
  validationMessage?: FormFieldProps["validationMessage"];
}

/**
 * Textarea is a form element that accepts multiple lines of text.
 * @param props - {@link TextareaProps}
 * @returns a React element
 */

export const Textarea = ({
  skin = "default",
  label,
  description,
  validationMessage,
  className,
  ...props
}: Readonly<TextareaProps>): React.ReactElement => (
  <FormField {...{ skin, label, description, validationMessage }}>
    <textarea {...props} className={classNames(className, styles.root)} />
  </FormField>
);
