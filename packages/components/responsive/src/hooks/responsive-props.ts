import { useMemo } from "react";
import { type BaseProps, type ResponsiveProps } from "../types";
import { useBreakpoints } from "./breakpoints";
import { eachBreakpoint } from "../utils";

export interface UseResponsiveProps<T extends BaseProps> extends ResponsiveProps<T> {
  baseProps: T;
}

export const useResponsiveProps = <T extends BaseProps>({
  baseProps,
  responsive,
}: UseResponsiveProps<T>): T => {
  const { target, ...responsiveProps } = responsive ?? {};
  const active = useMemo(() => Boolean(responsive), [responsive]);
  const { breakpointsData } = useBreakpoints(active, target);

  return useMemo<T>(() => {
    // use default props when not active
    if (!active) return baseProps;

    let tmpProps: T = baseProps;

    eachBreakpoint((bpKey) => {
      // exit if curr breakpoint is not active
      if (!breakpointsData?.[bpKey]) return;

      const currBreakpointProps = responsiveProps[bpKey];

      tmpProps = {
        ...tmpProps,
        ...currBreakpointProps,
      };
    });

    return tmpProps;
  }, [breakpointsData, baseProps, active, responsiveProps]);
};
