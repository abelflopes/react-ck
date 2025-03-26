import React from "react";

export interface FormFieldContextProps {
  skin: "default" | "negative" | "average" | "positive" | "ghost" | "muted";
  id: string;
}

export const FormFieldContext = React.createContext<FormFieldContextProps | undefined>(undefined);

export const useFormFieldContext = (): FormFieldContextProps | undefined =>
  React.useContext(FormFieldContext);
