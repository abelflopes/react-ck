let n = 0;

export const generateId = (): string => {
  n += 1;

  return `${n}.${new Date().getTime()}.${Math.random()}`;
};
