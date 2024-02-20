import React from "react";
import { type FormFieldMap, type InputAdapterProps } from "../types";
import { Textarea } from "@react-ck/textarea";

export const TextareaAdapter = <K extends string, T extends FormFieldMap, KT extends keyof T>({
  value,
  key,
  props,
  isTouched,
  valid,
  error,
  setInternalValues,
}: Readonly<InputAdapterProps<"textarea", K, T, KT>>): React.ReactElement => (
  <Textarea
    key={key}
    {...props}
    value={typeof value === "string" ? value : ""}
    skin={isTouched && !valid ? "negative" : "default"}
    description={(isTouched ? error : undefined) ?? props.description}
    onChange={(e) => {
      setInternalValues((v) => ({
        values: {
          ...v.values,
          [key]: e.currentTarget.value.length > 0 ? e.currentTarget.value : null,
        },
        changeType: "user",
        changedField: key,
      }));
      props.onChange?.(e);
    }}
  />
);
