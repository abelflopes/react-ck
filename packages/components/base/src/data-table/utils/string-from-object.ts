function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

/** Destructs an object into a plain string, has depth limitation to preserve performance */

export const stringFromObject = (obj: object, initialDepth = 0): string => {
  const maxDepth = 5;
  const depth = initialDepth + 1;

  const res = Object.entries(obj)
    .flatMap(([key, value]) => {
      let converted: string | undefined = undefined;

      if (typeof value === "string") converted = value;
      else if (typeof value === "function") converted = String(value);
      else if (value === null || value === undefined) converted = "";
      else if (isObject(value)) converted = depth < maxDepth ? stringFromObject(value, depth) : "";
      else converted = String(value);

      return [key, converted];
    })
    .join(" ");

  return res;
};
