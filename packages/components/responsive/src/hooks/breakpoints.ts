import { useEffect, useMemo, useState } from "react";
import { type ResponsiveTarget, type EnabledBreakpointsMapping, type Breakpoint } from "../types";
import { breakpointKeys, breakpoints } from "../constants";
import { eachBreakpoint } from "../utils";

const baseBreakpointsData: EnabledBreakpointsMapping = {
  xs: false,
  s: false,
  m: false,
  l: false,
  xl: false,
  xxl: false,
};

/**
 * Returns a map that informs which breakpoints are active
 * @param target - which reference to use, defaults to viewport but can also use an element
 * @returns @see {@link UseResponsiveData}
 */
export const useBreakpoints = (
  active: boolean, // TODO: enable activating for specific breakpoints
  target: ResponsiveTarget = "viewport",
): {
  breakpointsData: EnabledBreakpointsMapping | undefined;
  activeBreakpoint: Breakpoint | undefined;
} => {
  const [breakpointsData, setBreakpointsData] = useState<EnabledBreakpointsMapping | undefined>(
    undefined,
  );

  const activeBreakpoint = useMemo<Breakpoint | undefined>(() => {
    if (!active || !breakpointsData) return;

    let tmpActiveBreakpoint: Breakpoint = "xs";

    eachBreakpoint((bpKey) => {
      if (breakpointsData[bpKey]) tmpActiveBreakpoint = bpKey;
    });

    return tmpActiveBreakpoint;
  }, [breakpointsData, active]);

  // Handle HTMLElement detection
  useEffect(() => {
    if (!active || target === "viewport") return;

    const el = target.current;
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
  }, [target, active]);

  // Handle viewport detection
  useEffect(() => {
    if (!active || target !== "viewport") return;

    const removeListeners = breakpointKeys.map((bpKey) => {
      const data = window.matchMedia(`(min-width: ${breakpoints[bpKey]}px)`);

      setBreakpointsData((v) => ({
        ...baseBreakpointsData,
        ...v,
        [bpKey]: data.matches,
      }));

      const listener = (e: MediaQueryListEventMap["change"]): void => {
        setBreakpointsData((v) => ({
          ...baseBreakpointsData,
          ...v,
          [bpKey]: e.matches,
        }));
      };

      data.addEventListener("change", listener);

      return (): void => {
        data.removeEventListener("change", listener);
      };
    });

    return () => {
      removeListeners.forEach((removeListener) => {
        removeListener();
      });
    };
  }, [active, target]);

  return useMemo(
    () => ({
      breakpointsData,
      activeBreakpoint,
    }),
    [activeBreakpoint, breakpointsData],
  );
};
