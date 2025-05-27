import styles from "./styles/index.module.scss";
import React, { useMemo } from "react";
import classNames from "classnames";
import { type FormFieldContextProps, useFormFieldContext } from "../form-field";
import { type BooleanInputIconComponent } from "./types";

/**
 * Props interface for the BooleanInput component.
 * Base component for checkbox and radio inputs with custom icons.
 */
export interface BooleaInputProps extends React.ComponentProps<"input"> {
  /** Component to render the input's visual state */
  Icon: BooleanInputIconComponent;
  /** Visual theme of the input. When used within FormField, define on FormField instead.
   * @default "default"
   */
  skin?: FormFieldContextProps["skin"];
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
  ...otherProps
}: Readonly<BooleaInputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  return (
    <span
      className={classNames(
        styles.root,
        className,
        (disabled || formFieldContext?.disabled) && styles.disabled,
      )}>
      <input {...otherProps} id={computedId} className={styles.input} disabled={disabled} />

      <Icon {...otherProps} skin={skin ?? formFieldContext?.skin} />
    </span>
  );
};
