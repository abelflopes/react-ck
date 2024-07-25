let baseSize = 320;
const increment = 220;

export const breakpoints = {
  xs: baseSize,
  s: (baseSize += increment),
  m: (baseSize += increment),
  l: (baseSize += increment),
  xl: (baseSize += increment),
  xxl: (baseSize += increment),
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- in this case we are sure the type matches
export const breakpointKeys = Object.keys(breakpoints) as unknown as Array<
  keyof typeof breakpoints
>;
