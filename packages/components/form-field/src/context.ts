import React from "react";

export interface FormFieldContextProps {
  skin: "default" | "negative" | "average" | "positive" | "ghost";
  id: string;
}

export const FormFieldContext = React.createContext<FormFieldContextProps>({
  id: "",
  skin: "default",
});

export const useFormFieldContext = (): FormFieldContextProps => React.useContext(FormFieldContext);
