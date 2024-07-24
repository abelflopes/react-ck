import { useEffect, useState } from "react";
import { type ResponsiveTarget, type EnabledBreakpointsMapping } from "../types";
import { breakpointKeys, breakpoints } from "../constants";

/**
 * Returns a map that informs which breakpoints are active
 * @param target - which reference to use, defaults to viewport but can also use an element
 * @returns @see {@link UseResponsiveData}
 */
export const useResponsive = (target: ResponsiveTarget = "viewport"): EnabledBreakpointsMapping => {
  const [activeBreakpoints, setActiveBreakpoints] = useState<EnabledBreakpointsMapping>({
    xs: false,
    s: false,
    m: false,
    l: false,
    xl: false,
    xxl: false,
  });

  // Handle HTMLElement detection
  useEffect(() => {
    if (target === "viewport") return;

    const el = target.current;
    if (!el) return;

    const check = (): void => {
      breakpointKeys.forEach((bpKey) => {
        const width = el.clientWidth;

        setActiveBreakpoints((v) => ({
          ...v,
          [bpKey]: width >= breakpoints[bpKey],
        }));
      });
    };

    const resizeObserver = new ResizeObserver(check);

    check();
    resizeObserver.observe(el);

    return () => {
      resizeObserver.unobserve(el);
    };
  }, [target]);

  // Handle viewport detection
  useEffect(() => {
    if (target !== "viewport") return;

    const removeListeners = breakpointKeys.map((bpKey) => {
      const data = window.matchMedia(`(min-width: ${breakpoints[bpKey]}px)`);

      setActiveBreakpoints((v) => ({
        ...v,
        [bpKey]: data.matches,
      }));

      const listener = (e: MediaQueryListEventMap["change"]): void => {
        setActiveBreakpoints((v) => ({
          ...v,
          [bpKey]: e.matches,
        }));
      };

      data.addEventListener("change", listener);

      const removeListener = (): void => {
        data.removeEventListener("change", listener);
      };

      return removeListener;
    });

    return () => {
      removeListeners.forEach((removeListener) => {
        removeListener();
      });
    };
  }, [target]);

  return activeBreakpoints;
};
