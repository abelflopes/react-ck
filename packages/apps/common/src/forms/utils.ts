export const REGEX = {
  email: {
    exp: /[\d%+._a-z-]+@[\d.a-z-]+.[a-z]{2,}$/u,
    description: "Insert a valid email",
  },
  password: {
    exp: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/u,
    description:
      "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters",
  },
} satisfies Record<
  string,
  {
    exp: RegExp;
    description: string;
  }
>;

export const regexValidation = (value: string, key: keyof typeof REGEX): string | undefined => {
  if (REGEX[key].exp.exec(value) === null) return REGEX[key].description;
  return undefined;
};
