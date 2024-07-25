// Sync with ./styles/_variables.scss
export const breakpoints = {
  xs: 320,
  s: 540,
  m: 760,
  l: 980,
  xl: 1200,
  xxl: 1420,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- in this case we are sure the type matches
export const breakpointKeys = Object.keys(breakpoints) as unknown as Array<
  keyof typeof breakpoints
>;
