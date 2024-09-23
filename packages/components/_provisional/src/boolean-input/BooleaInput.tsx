import styles from "./styles/index.module.scss";
import React, { useMemo, useState } from "react";
import classNames from "classnames";
import { type FormFieldContextProps, useFormFieldContext } from "@react-ck/form-field";
import { type BooleanInputIconComponent } from "./types";

export interface BooleaInputProps extends React.ComponentProps<"input"> {
  Icon: BooleanInputIconComponent;
  skin?: FormFieldContextProps["skin"];
}

export const BooleaInput = ({
  Icon,
  skin,
  className,
  id,
  checked,
  value,
  name,
  onChange,
  ...otherProps
}: Readonly<BooleaInputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  const [localChecked, setLocalChecked] = useState(Boolean(checked));

  return (
    <span className={classNames(styles.root, className)}>
      <input
        {...otherProps}
        id={computedId}
        name={name}
        checked={checked}
        value={value}
        className={styles.input}
        onChange={(e) => {
          onChange?.(e);
          setLocalChecked(e.target.checked);
        }}
      />

      <Icon
        name={name}
        checked={localChecked}
        value={value}
        skin={skin ?? formFieldContext?.skin}
      />
    </span>
  );
};
