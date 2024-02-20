import { type FormValues, type FormFieldMap, type FormValidators } from "../src";
import { REGEX, regexValidation } from "./utils";

export const fields = {
  email: {
    type: "input",
    props: {
      label: "Email Address",
      placeholder: "john-doe@aaa.com",
      description: "Your work email address",
    },
  },
  password: {
    type: "input",
    props: {
      type: "password",
      label: "Password",
      placeholder: "Strong password",
      description: REGEX.password.description,
    },
  },
  passwordRepeat: {
    type: "input",
    props: {
      type: "password",
      label: "Repeat Password",
      placeholder: "Repeat password",
    },
  },
} satisfies FormFieldMap;

export type Values = FormValues<typeof fields>;

export const validators = {
  email: (values): string | undefined => {
    if (!values.email?.toString().trim().length) return "Required field";
    return regexValidation(String(values.email), "email");
  },
  password: (values): string | undefined => {
    if (!values.password?.toString().trim().length) return "Required field";
    return regexValidation(String(values.password), "password");
  },
  passwordRepeat: (values): string | undefined => {
    if (!values.passwordRepeat?.toString().trim().length) return "Required field";
    if (values.password !== values.passwordRepeat) return "Passwords must be equal";
    return regexValidation(String(values.passwordRepeat), "password");
  },
} satisfies FormValidators<typeof fields>;

export const values = {
  email: "",
  password: "",
  passwordRepeat: "",
} satisfies FormValues<typeof fields>;
