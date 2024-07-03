import React, { useEffect, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { FormField, useFormFieldContext, type FormFieldProps } from "@react-ck/form-field";
import { SelectOption } from "./SelectOption";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  skin?: FormFieldProps["skin"];
}

/**
 * Select is a type of input that allows users to choose one or more options from a list of choices.
 * The options are hidden by default and revealed when a user interacts with an element. It shows the currently selected option in its default collapsed state.
 * @param props - {@link SelectProps}
 * @returns a React element
 */

const Select = ({ skin, id, className, ...props }: Readonly<SelectProps>): React.ReactElement => {
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
    if (skin) throw new Error("When using select inside form field, define skin on the form field");
    else if (id)
      throw new Error("When using select inside form field, define id on the form field");
  }, [formFieldContext, id, skin]);

  return (
    <select
      {...props}
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

Select.Option = SelectOption;

export { Select, type SelectProps };
