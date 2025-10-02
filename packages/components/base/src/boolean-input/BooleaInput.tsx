import styles from "./styles/index.module.scss";
import React, { useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { type FormFieldContextProps, useFormFieldContext } from "../form-field";
import { type BooleanInputIconComponent } from "./types";
import { mergeRefs } from "@react-ck/react-utils";

/**
 * Props interface for the BooleanInput component.
 * Base component for checkbox and radio inputs with custom icons.
 */
export interface BooleaInputProps extends React.ComponentPropsWithRef<"input"> {
  /** Component to render the input's visual state */
  Icon: BooleanInputIconComponent;
  /** Visual theme of the input. When used within FormField, define on FormField instead.
   */
  skin?: FormFieldContextProps["skin"];
  /**
   * Whether the input is indeterminate.
   */
  indeterminate?: boolean;
}

/**
 * Base component for boolean input types (checkbox, radio).
 * Handles input state and custom icon rendering.
 *
 * @param props - Component props {@link BooleaInputProps}
 * @returns React element
 */
export const BooleaInput = ({
  Icon,
  skin,
  className,
  id,
  disabled,
  indeterminate,
  ref,
  ...otherProps
}: Readonly<BooleaInputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();
  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) return;

    input.indeterminate = indeterminate ?? false;
  }, [indeterminate]);

  return (
    <span
      className={classNames(
        styles.root,
        className,
        (disabled || formFieldContext?.disabled) && styles.disabled,
      )}>
      <input
        ref={mergeRefs(ref, inputRef)}
        id={computedId}
        className={styles.input}
        disabled={disabled}
        {...otherProps}
      />

      <Icon {...otherProps} skin={skin ?? formFieldContext?.skin} />
    </span>
  );
};
