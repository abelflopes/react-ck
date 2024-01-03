import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { FormField, type FormFieldProps } from "@react-ck/form-field";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> {
  label?: FormFieldProps["label"];
  skin?: FormFieldProps["skin"];
  description?: FormFieldProps["description"];
  validationMessage?: FormFieldProps["validationMessage"];
}

/**
 * Input is a form element that accepts a single line of text.
 * @param props - {@link InputProps}
 * @returns a React element
 */

export const Input = ({
  skin = "default",
  label,
  description,
  validationMessage,
  className,
  ...props
}: Readonly<InputProps>): React.ReactElement => (
  <FormField {...{ skin, label, description, validationMessage }}>
    <input {...props} className={classNames(className, styles.root)} />
  </FormField>
);
