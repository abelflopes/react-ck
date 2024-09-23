import { type FormFieldContextProps } from "@react-ck/form-field";
import { type ComponentProps } from "react";

interface BaseProps extends Required<Pick<ComponentProps<"input">, "name" | "value">> {
  skin: FormFieldContextProps["skin"];
}

export type BooleanInputIconProps = {
  [key in keyof BaseProps]: BaseProps[key] | undefined;
};

export type BooleanInputIconComponent = (props: BooleanInputIconProps) => React.ReactNode;
