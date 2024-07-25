import { type Breakpoint } from "./types";
import { breakpointKeys, breakpoints } from "./constants";

/** Run through all breakpoint keys sorted from lowest to biggest size */
export const eachBreakpoint = (cb: (b: Breakpoint) => void): void => {
  [...breakpointKeys]
    // ensure is sorted by lowest first
    .sort((a, b) => (breakpoints[a] < breakpoints[b] ? -1 : 1))
    .forEach(cb);
};
