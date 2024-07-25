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
  }, [breakpointsData]);

  useEffect(() => {
    // eslint-disable-next-line no-console -- temp debug / TODO: remove
    console.log("useResponsiveProps: computedProps", computedProps);
  }, [computedProps]);

  useEffect(() => {
    // eslint-disable-next-line no-console -- temp debug / TODO: remove
    console.log("useResponsiveProps: active", active);
  }, [active]);

  return computedProps;
};
