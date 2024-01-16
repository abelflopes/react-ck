import type { InputProps } from "@react-ck/input";
import type { SelectProps } from "@react-ck/select";
import type { TextareaProps } from "@react-ck/textarea";

type FieldTypes = "input" | "select" | "textarea";

// Utility type to compose fields, applies a type discriminator
// to easily distinguish fields
interface Field<T extends FieldTypes, P> {
  type: T;
  props: P;
}

// Types of fields available for the developer
type BaseFieldListMap<K extends Record<FieldTypes, unknown>> = K;
type FieldListMap = BaseFieldListMap<{
  input: Field<"input", InputProps>;
  select: Field<"select", SelectProps>;
  textarea: Field<"textarea", TextareaProps>;
}>;

// Utility type grouping all fields
type AnyField = FieldListMap[FieldTypes];

// Utility type to properly define value types according to its field
type BaseTypeValueMap<K extends Record<FieldTypes, unknown>> = K;
type TypeValueMap = BaseTypeValueMap<{
  input: NonNullable<InputProps["value"]> | null;
  select: NonNullable<SelectProps["value"]> | null;
  textarea: NonNullable<TextareaProps["value"]> | null;
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
