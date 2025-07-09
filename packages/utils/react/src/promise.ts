export const sequentialPromiseAll = async <T>(promises: Array<() => Promise<T>>): Promise<T[]> => {
  const results: T[] = [];

  await promises.reduce(async (acc, promise) => {
    await acc;
    results.push(await (typeof promise === "function" ? promise() : promise));
  }, Promise.resolve());

  return results;
};
