import { type FormValues, type FormFieldMap, type FormValidators } from "react-ck";
// import { REGEX, regexValidation } from "./utils";

export const fields = {
  nif: {
    type: "input",
    props: {
      type: "number",
      label: "NIF",
      min: 100000000,
      max: 999999999,
      autoFocus: true,
      required: true,
    },
  },
  birthDate: {
    type: "input",
    props: {
      label: "Data de Nascimento",
      type: "date",
      required: true,
    },
  },
  startDate: {
    type: "input",
    props: {
      label: "Data de início",
      type: "date",
      required: true,
    },
  },
  interestRate: {
    type: "input",
    props: {
      type: "number",
      label: "TAN",
      required: true,
    },
  },
  loanValue: {
    type: "input",
    props: {
      type: "number",
      label: "Valor do Crédito",
      min: 1,
      required: true,
    },
  },
  duration: {
    type: "input",
    props: {
      type: "number",
      label: "Duração (anos)",
      min: 1,
      required: true,
    },
  },
  smoker: {
    type: "select",
    props: {
      label: "Fumador",
      options: [
        { value: "n", label: "Não Fumador" },
        { value: "y", label: "Fumador" },
      ],
      required: true,
    },
  },
  job: {
    type: "select",
    props: {
      label: "Profissão",
      options: [{ value: "programador", label: "Programador" }],
      required: true,
    },
  },
} satisfies FormFieldMap;

export type Values = FormValues<typeof fields>;

export const validators = {
  nif: (): string | undefined => undefined,
  birthDate: (): string | undefined => undefined,
  startDate: (): string | undefined => undefined,
  interestRate: (): string | undefined => undefined,
  loanValue: (): string | undefined => undefined,
  duration: (): string | undefined => undefined,
  smoker: (): string | undefined => undefined,
  job: (): string | undefined => undefined,
} satisfies FormValidators<typeof fields>;

export const values = {
  nif: "229189385",
  birthDate: "1995-01-03",
  startDate: "2024-12-01",
  interestRate: "0.03",
  loanValue: "30000",
  duration: "30",
  smoker: "y",
  job: "programador",
} satisfies FormValues<typeof fields>;
