import React, { useEffect, useId, useMemo } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { useFormFieldContext, type FormFieldProps } from "@react-ck/form-field";
import { AutocompleteOption } from "./AutocompleteOption";

interface AutocompleteProps extends React.InputHTMLAttributes<HTMLInputElement> {
  skin?: FormFieldProps["skin"];
}

/**
 * Autocomplete is a text input that proactively suggests options based on the user’s initial input. The suggested options appear alongside the input in a panel.
 * @param props - {@link AutocompleteProps}
 * @returns a React element
 */

const Autocomplete = ({
  skin,
  id,
  className,
  children,
  ...props
}: Readonly<AutocompleteProps>): React.ReactElement => {
  const listId = useId();
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
    if (skin)
      throw new Error("When using autocomplete inside form field, define skin on the form field");
    else if (id)
      throw new Error("When using autocomplete inside form field, define id on the form field");
  }, [formFieldContext, id, skin]);

  return (
    <>
      <input
        {...props}
        id={computedId}
        list={listId}
        className={classNames(
          styles.root,
          formFieldContext === undefined && styles.standalone,
          className,
          styles[`skin_${computedSkin}`],
        )}
      />
      <datalist id={listId}>{children}</datalist>
    </>
  );
};

Autocomplete.Option = AutocompleteOption;

export { Autocomplete, type AutocompleteProps };
