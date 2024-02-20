import React from "react";
import { type FormFieldMap, type InputAdapterProps } from "../types";
import { Input } from "@react-ck/input";

export const InputAdapter = <K extends string, T extends FormFieldMap, KT extends keyof T>({
  value,
  key,
  props,
  isTouched,
  valid,
  error,
  setInternalValues,
}: Readonly<InputAdapterProps<"input", K, T, KT>>): React.ReactElement => (
  <Input
    key={key}
    {...props}
    value={typeof value === "string" ? value : ""}
    skin={isTouched && !valid ? "negative" : "default"}
    description={(isTouched ? error : undefined) ?? props.description}
    onChange={(e) => {
      setInternalValues((v) => ({
        values: {
          ...v.values,
          [key]: e.target.value.length > 0 ? e.target.value : null,
        },
        changeType: "user",
        changedField: key,
      }));
      props.onChange?.(e);
    }}
  />
);
