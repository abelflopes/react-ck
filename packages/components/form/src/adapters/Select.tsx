import React from "react";
import { type FormFieldMap, type InputAdapterProps } from "../types";
import { Select } from "@react-ck/select";

export const SelectAdapter = <K extends string, T extends FormFieldMap, KT extends keyof T>({
  value,
  fieldKey,
  props,
  isTouched,
  valid,
  error,
  setInternalValues,
}: Readonly<InputAdapterProps<"select", K, T, KT>>): React.ReactElement => (
  <Select
    key={fieldKey}
    {...props}
    value={typeof value === "string" ? value : ""}
    skin={isTouched && !valid ? "negative" : "default"}
    description={(isTouched ? error : undefined) ?? props.description}
    onChange={(e) => {
      const currValue = e.currentTarget.value;
      setInternalValues((v) => ({
        values: {
          ...v.values,
          [fieldKey]: currValue.length > 0 ? currValue : null,
        },
        changeType: "user",
        changedField: fieldKey,
      }));
      props.onChange?.(e);
    }}>
    {props.options.map(({ value, label }) => (
      <Select.Option key={value} value={value}>
        {label}
      </Select.Option>
    ))}
  </Select>
);
