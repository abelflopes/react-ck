import React, { useEffect, useState } from "react";
import {
  type InternalValues,
  type FormFieldMap,
  type FormValidators,
  type FormValidity,
  type FormValues,
} from "./types";
import classNames from "classnames";
import * as styles from "./styles/index.module.scss";
import { InputAdapter } from "./adapters/Input";
import { TextareaAdapter } from "./adapters/Textarea";
import { SelectAdapter } from "./adapters/Select";

const RESTRICTED_PROPS = ["selectedValue", "defaultValue", "value"];

export interface FormProps<T extends FormFieldMap>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  fields: T;
  onChange: (data: FormValues<T>) => void;
  onValidityChange?: (validity: FormValidity<T>) => void;
  values: FormValues<T>;
  validators?: FormValidators<T>;
  children?: React.ReactNode;
}

export const Form = <T extends FormFieldMap>({
  fields,
  onChange,
  onValidityChange,
  values,
  validators,
  className,
  children,
  ...props
}: Readonly<FormProps<T>>): React.ReactElement => {
  const [internalValues, setInternalValues] = useState<InternalValues<T>>({
    values,
    changedField: undefined,
    changeType: "internal",
  });
  const [fieldElements, setFieldElements] = useState<React.ReactNode[]>([]);
  const [validity, setValidity] = useState<FormValidity<T>>({
    valid: false,
    fields: {},
  });
  // State that informs that the values were changed by the user
  const [isTouched, setIsTouched] = useState<{ [key in keyof T]?: boolean }>({});

  // Create UI elements to render
  useEffect(() => {
    const tmpFieldElements: React.ReactNode[] = [];

    for (const fieldKey in fields) {
      if (fields[fieldKey] !== undefined) {
        const item = fields[fieldKey];

        if (item === undefined) continue;

        // Validate props
        if (Object.keys(item.props).some((i) => RESTRICTED_PROPS.includes(i))) {
          throw new Error(
            `Properties "${RESTRICTED_PROPS.join(
              ",",
            )}" are restricted, please use Form "defaultValues"`,
          );
        }

        const value = internalValues.values[fieldKey];

        const adapterProps = {
          key: fieldKey,
          fieldKey,
          value,
          isTouched: Boolean(isTouched[fieldKey]),
          valid: Boolean(validity.fields[fieldKey]?.valid),
          error: validity.fields[fieldKey]?.error,
          setInternalValues,
        };

        tmpFieldElements.push(
          ((): React.ReactNode => {
            switch (item.type) {
              case "input":
                return <InputAdapter {...{ ...item, ...adapterProps }} />;
              case "select":
                return <SelectAdapter {...{ ...item, ...adapterProps }} />;
              case "textarea":
                return <TextareaAdapter {...{ ...item, ...adapterProps }} />;
              default:
                throw new Error(`Field "${JSON.stringify(item)}" is not implemented`);
            }
          })(),
        );
      }
    }

    setFieldElements(tmpFieldElements);
  }, [fields, internalValues, isTouched, validity]);

  // Invoke onchange when internal state changes
  useEffect(() => {
    if (internalValues.changeType !== "user") return;
    onChange(internalValues.values);
  }, [internalValues, onChange]);

  // Update internal values when external state changes
  useEffect(() => {
    setInternalValues({
      values,
      changeType: "internal",
      changedField: undefined,
    });
  }, [values]);

  // Validate values
  useEffect(() => {
    if (!validators) return;

    setValidity({
      valid: true,
      fields: {},
    });

    for (const key in internalValues.values) {
      const error = validators[key]?.(internalValues.values);

      setValidity((v) => ({
        valid: !error && v.valid,
        fields: {
          ...v.fields,
          [key]: {
            valid: !error,
            error,
          },
        },
      }));
    }
  }, [internalValues.values, validators]);

  // Emit validity state change
  useEffect(() => {
    onValidityChange?.(validity);
  }, [onValidityChange, validity]);

  // Update state that informs that the values were changed by the user
  useEffect(() => {
    if (internalValues.changeType !== "user") return;

    setIsTouched((v) =>
      internalValues.changedField
        ? {
            ...v,
            [internalValues.changedField]: true,
          }
        : v,
    );
  }, [internalValues.changeType, internalValues.changedField]);

  return (
    <div {...props} className={classNames(className, styles.root)}>
      {fieldElements}
      {children}
    </div>
  );
};
