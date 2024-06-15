import type React from "react";
import { type InputProps } from "@react-ck/input";
import { type SelectProps } from "@react-ck/select";
import { type TextareaProps } from "@react-ck/textarea";

type FieldTypes = "input" | "select" | "textarea";

// Utility type to compose fields, applies a type discriminator
// to easily distinguish fields
interface Field<T extends FieldTypes, P> {
  type: T;
  props: P;
}

// Utility type grouping all fields
type AnyField = FieldListMap[FieldTypes];

// Utility type to properly define value types according to its field
type BaseTypeValueMap<K extends Record<FieldTypes, unknown>> = K;
type TypeValueMap = BaseTypeValueMap<{
  input: NonNullable<InputProps["value"]> | null;
  select: NonNullable<SelectProps["value"]> | null;
  textarea: NonNullable<TextareaProps["value"]> | null;
}>;

// Types of fields available for the developer
type BaseFieldListMap<K extends Record<FieldTypes, unknown>> = K;

export type FieldListMap = BaseFieldListMap<{
  input: Field<"input", InputProps>;
  select: Field<"select", SelectProps & { options: Array<{ value: string; label: string }> }>;
  textarea: Field<"textarea", TextareaProps>;
}>;

// Utility type describing map provided by the developer
export type FormFieldMap = Record<string, AnyField>;

// Utility type describing the form payload
export type FormValues<T extends FormFieldMap> = { [key in keyof T]: TypeValueMap[T[key]["type"]] };

// Type describing form validator functions mapped to each field
export type FormValidators<T extends FormFieldMap> = {
  [key in keyof T]?: (values: FormValues<T>) => string | undefined;
};

export interface FormValidity<T extends FormFieldMap> {
  valid: boolean;
  fields: {
    [key in keyof T]?: {
      valid: boolean;
      error: string | undefined;
    };
  };
}

export interface InternalValues<T extends FormFieldMap> {
  values: FormValues<T>;
  changedField: keyof T | undefined;
  changeType: "user" | "internal";
}

export type InputAdapterProps<
  F extends keyof FieldListMap,
  K extends string,
  T extends FormFieldMap,
  KT extends keyof T,
> = FieldListMap[F] & {
  fieldKey: K;
  value: FormValues<T>[KT];
  isTouched: boolean;
  valid: boolean;
  error: string | undefined;
  setInternalValues: React.Dispatch<React.SetStateAction<InternalValues<T>>>;
};
