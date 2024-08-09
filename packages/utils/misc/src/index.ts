type PropsMap<T extends object> = {
  [key in keyof T]: Array<T[key]>;
};

const generateCombinations = <T extends object>(propsMap: PropsMap<T>): T[] => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed
  const keys = [...(Object.keys(propsMap) as Array<keyof T>)];
  const combinations: T[] = [];

  const combine = (index: number, currentCombination: Partial<T>): void => {
    if (index === keys.length) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- beeded (dynamic / recursive)
      combinations.push(currentCombination as T);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed (dynamic / recursive)
    const key = keys[index] as unknown as keyof T;
    const values = propsMap[key];

    for (const value of values) combine(index + 1, { ...currentCombination, [key]: value });
  };

  combine(0, {});
  return combinations;
};

// eslint-disable-next-line complexity -- no alternative
const describeCombination = (data: unknown): string => {
  if (data === null) return "null";

  switch (typeof data) {
    case "boolean":
    case "string":
    case "number":
    case "undefined":
      return String(data?.toString());
    case "function":
      return data.name.length ? `${data.name}()` : "someFunction()";
    case "object":
      if (data instanceof Array) return JSON.stringify(data.map(describeCombination), null, 2);
      return JSON.stringify(
        Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (typeof value === "object" && value !== null && "$$typeof" in value)
              return [key, "ReactElement"];

            return [key, describeCombination(value)];
          }),
        ),
        null,
        2,
      );
    case "symbol":
      return "data.toString()";
    default:
      // eslint-disable-next-line no-console -- help debug
      console.warn("unsupported item:", data);
      throw new Error(`describeCombination - unsupported type: ${typeof data} / ${String(data)}`);
  }
};

export const generateDescribedCombinations = <T extends object>(
  propsMap: PropsMap<T>,
): Array<{ combination: T; description: string }> =>
  generateCombinations<T>(propsMap).map((i) => ({
    description: describeCombination(i),
    combination: i,
  }));

export { type PropsMap };
