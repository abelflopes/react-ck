import { type breakpointKeys } from "./constants";

export type BaseProps = Record<string, unknown>;

export type ResponsiveTarget = "viewport" | React.RefObject<HTMLElement>;

export type Breakpoint = (typeof breakpointKeys)[number];

export interface ResponsiveProps<T extends BaseProps> {
  responsive?: {
    target?: ResponsiveTarget;
  } & {
    [key in Breakpoint]: Partial<T>;
  };
}

export type EnabledBreakpointsMapping = {
  [key in Breakpoint]: boolean;
};
