export const objectExclude = <T extends Record<string, unknown>, A extends Array<keyof T>>(
  obj: T,
  exc: A,
): Omit<T, A[number]> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- object entries weak types
  Object.fromEntries(Object.entries(obj).filter(([k]) => !exc.includes(k))) as Omit<T, A[number]>;
