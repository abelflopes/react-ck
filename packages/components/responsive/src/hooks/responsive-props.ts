import { useEffect, useMemo, useState } from "react";
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
  const [computedProps, setComputedProps] = useState<T>(baseProps);

  useEffect(() => {
    if (!active) {
      setComputedProps(baseProps);
      return;
    }

    let tmpProps: T = baseProps;

    eachBreakpoint((bpKey) => {
      // exit if curr breakpoint is not active
      if (!breakpointsData[bpKey]) return;

      const currBreakpointProps = responsiveProps[bpKey];

      tmpProps = {
        ...tmpProps,
        ...currBreakpointProps,
      };
    });

    setComputedProps(tmpProps);
  }, [breakpointsData, baseProps, active, responsiveProps]);

  return computedProps;
};
