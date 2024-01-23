import React, { useEffect, useState } from "react";
import { Input } from "@react-ck/input";
import { Select } from "@react-ck/select";
import { Textarea } from "@react-ck/textarea";
import {
  type FormFieldMap,
  type FormValidators,
  type FormValidity,
  type FormValues,
} from "./types";
import classNames from "classnames";
import styles from "./styles/index.module.scss";

const RESTRICTED_PROPS = ["selectedValue", "defaultValue", "value"];

export interface FormProps<T extends FormFieldMap>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  fields: T;
  onChange: (data: FormValues<T>) => void;
  onValidityChange?: (validity: FormValidity<T>) => void;
  values: FormValues<T>;
  validators?: FormValidators<T>;
}

export const Form = <T extends FormFieldMap>({
  fields,
  onChange,
  onValidityChange,
  values,
  validators,
  className,
  ...props
}: Readonly<FormProps<T>>): React.ReactElement => {
  const [internalValues, setInternalValues] = useState<{
    values: FormValues<T>;
    changedField: keyof T | undefined;
    changeType: "user" | "internal";
  }>({ values, changedField: undefined, changeType: "internal" });
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

    for (const key in fields) {
      if (fields[key] !== undefined) {
        const item = fields[key];

        if (item === undefined) continue;

        // Validate props
        if (Object.keys(item.props).some((i) => RESTRICTED_PROPS.includes(i))) {
          throw new Error(
            `Properties "${RESTRICTED_PROPS.join(
              ",",
            )}" are restricted, please use Form "defaultValues"`,
          );
        }

        const value = internalValues.values[key];

        tmpFieldElements.push(
          ((): React.ReactNode => {
            if (item.type === "input")
              return (
                <Input
                  key={key}
                  {...item.props}
                  skin={
                    isTouched[key] && validity.fields[key]?.valid === false ? "negative" : "default"
                  }
                  description={
                    (isTouched[key] ? validity.fields[key]?.error : undefined) ??
                    item.props.description
                  }
                  value={typeof value === "string" ? value : ""}
                  onChange={(e) => {
                    setInternalValues((v) => ({
                      values: {
                        ...v.values,
                        [key]: e.target.value.length > 0 ? e.target.value : null,
                      },
                      changeType: "user",
                      changedField: key,
                    }));
                    item.props.onChange?.(e);
                  }}
                />
              );

            if (item.type === "select")
              return (
                <Select
                  key={key}
                  {...item.props}
                  skin={
                    isTouched[key] && validity.fields[key]?.valid === false ? "negative" : "default"
                  }
                  description={
                    (isTouched[key] ? validity.fields[key]?.error : undefined) ??
                    item.props.description
                  }
                  value={typeof value === "string" ? value : ""}
                  onChange={(e) => {
                    setInternalValues((v) => ({
                      values: {
                        ...v.values,
                        [key]: e.currentTarget.value.length > 0 ? e.currentTarget.value : null,
                      },
                      changeType: "user",
                      changedField: key,
                    }));
                    item.props.onChange?.(e);
                  }}
                />
              );

            if (item.type === "textarea")
              return (
                <Textarea
                  key={key}
                  {...item.props}
                  skin={
                    isTouched[key] && validity.fields[key]?.valid === false ? "negative" : "default"
                  }
                  description={
                    (isTouched[key] ? validity.fields[key]?.error : undefined) ??
                    item.props.description
                  }
                  value={typeof value === "string" ? value : ""}
                  onChange={(e) => {
                    setInternalValues((v) => ({
                      values: {
                        ...v.values,
                        [key]: e.currentTarget.value.length > 0 ? e.currentTarget.value : null,
                      },
                      changeType: "user",
                      changedField: key,
                    }));
                    item.props.onChange?.(e);
                  }}
                />
              );

            throw new Error(`Field "${JSON.stringify(item)}" is not implemented`);
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

    // eslint-disable-next-line guard-for-in -- not needed
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
    </div>
  );
};
