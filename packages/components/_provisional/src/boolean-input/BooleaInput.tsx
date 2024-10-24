import styles from "./styles/index.module.scss";
import React, { useMemo } from "react";
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
  ...otherProps
}: Readonly<BooleaInputProps>): React.ReactElement => {
  const formFieldContext = useFormFieldContext();

  const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

  return (
    <span className={classNames(styles.root, className)}>
      <input {...otherProps} id={computedId} className={styles.input} />

      <Icon {...otherProps} skin={skin ?? formFieldContext?.skin} />
    </span>
  );
};
