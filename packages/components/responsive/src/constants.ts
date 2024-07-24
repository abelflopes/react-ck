export const breakpoints = {
  xs: 0,
  s: 540,
  m: 700,
  l: 1024,
  xl: 1200,
  xxl: 1600,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- in this case we are sure the type matches
export const breakpointKeys = Object.keys(breakpoints) as unknown as Array<
  keyof typeof breakpoints
>;
