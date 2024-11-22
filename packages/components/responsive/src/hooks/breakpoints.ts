import { useEffect, useMemo, useState } from "react";
import { type ResponsiveTarget, type EnabledBreakpointsMapping, type Breakpoint } from "../types";
import { breakpoints } from "../constants";
import { eachBreakpoint } from "../utils";
import { breakpointEvents } from "../utils/breakpoint-events";

const baseBreakpointsData: EnabledBreakpointsMapping = {
  xs: false,
  s: false,
  m: false,
  l: false,
  xl: false,
  xxl: false,
};

export interface UseBreakpoints {
  active?: boolean; // TODO: enable activating for specific breakpoints
  target?: ResponsiveTarget;
}

/**
 * Returns a map that informs which breakpoints are active
 * @param target - which reference to use, defaults to viewport but can also use an element
 * @returns @see {@link UseResponsiveData}
 */
export const useBreakpoints = (
  data?: Readonly<UseBreakpoints>,
): {
  breakpointsData: EnabledBreakpointsMapping | undefined;
  activeBreakpoint: Breakpoint | undefined;
} => {
  const computedActive = useMemo(() => data?.active ?? true, [data?.active]);
  const computedTarget = useMemo(() => data?.target ?? "viewport", [data?.target]);

  const [breakpointsData, setBreakpointsData] = useState<EnabledBreakpointsMapping | undefined>(
    undefined,
  );

  const activeBreakpoint = useMemo<Breakpoint | undefined>(() => {
    if (!computedActive || !breakpointsData) return;

    let tmpActiveBreakpoint: Breakpoint = "xs";

    eachBreakpoint((bpKey) => {
      if (breakpointsData[bpKey]) tmpActiveBreakpoint = bpKey;
    });

    return tmpActiveBreakpoint;
  }, [breakpointsData, computedActive]);

  // Handle HTMLElement detection
  useEffect(() => {
    if (!computedActive || computedTarget === "viewport") return;

    const el = computedTarget.current;
    if (!el) return;

    const check = (): void => {
      eachBreakpoint((bpKey) => {
        const width = el.clientWidth;

        setBreakpointsData((v) => ({
          ...baseBreakpointsData,
          ...v,
          [bpKey]: width >= breakpoints[bpKey],
        }));
      });
    };

    const resizeObserver = new ResizeObserver(check);

    // check(); // Check is fired initially
    resizeObserver.observe(el);

    return () => {
      resizeObserver.unobserve(el);
    };
  }, [computedTarget, computedActive]);

  // Handle viewport detection
  useEffect(() => {
    if (!computedActive || computedTarget !== "viewport") return;

    const unsubscribe = breakpointEvents.subscribe(({ breakpoint, matches }) => {
      setBreakpointsData((v) => ({
        ...baseBreakpointsData,
        ...v,
        [breakpoint]: matches,
      }));
    });

    return unsubscribe;
  }, [computedActive, computedTarget]);

  return useMemo(
    () => ({
      breakpointsData,
      activeBreakpoint,
    }),
    [activeBreakpoint, breakpointsData],
  );
};
