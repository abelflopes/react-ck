import React, { useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import { useFormFieldContext, type FormFieldProps } from "@react-ck/form-field";
import classNames from "classnames";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children"> {
  skin?: FormFieldProps["skin"];
  /** Ref for the root element */
  rootRef?: React.ForwardedRef<HTMLInputElement>;
}

/**
 * Input is a form element that accepts a single line of text.
 * @param props - {@link InputProps}
 * @returns a React element
 */

export const Input = ({
  skin,
  rootRef,
  id,
  className,
  ...props
}: Readonly<InputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedSkin = useMemo(
    () => formFieldContext?.skin ?? skin ?? "default",
    [formFieldContext?.skin, skin],
  );

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  // Validate usage inside form field
  useEffect(() => {
    // Is not inside form field, skip
    if (formFieldContext === undefined) return;

    // Is inside form field
    if (skin) throw new Error("When using input inside form field, define skin on the form field");
    else if (id) throw new Error("When using input inside form field, define id on the form field");
  }, [formFieldContext, id, skin]);

  return (
    <input
      {...props}
      ref={rootRef}
      id={computedId}
      className={classNames(
        styles.root,
        formFieldContext === undefined && styles.standalone,
        className,
        styles[`skin_${computedSkin}`],
      )}
    />
  );
};
