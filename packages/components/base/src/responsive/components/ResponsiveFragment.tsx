import { type default as React, useMemo } from "react";
import { type ResponsiveTarget, type EnabledBreakpointsMapping } from "../types";
import { useBreakpoints } from "../hooks/breakpoints";
import { eachBreakpoint } from "../utils";

/**
 * Props for configuring the ResponsiveFragment component
 */
export interface ResponsiveFragmentProps extends Partial<EnabledBreakpointsMapping> {
  /** Element to measure for breakpoints. Defaults to "viewport" */
  target?: ResponsiveTarget;
  /** Content to show/hide based on breakpoints */
  children?: React.ReactNode;
}

/**
 * Conditionally renders content based on breakpoints
 * Supports viewport or element-based breakpoint detection
 */
export const ResponsiveFragment = ({
  target = "viewport",
  children,
  ...enabledBreakpoints
}: Readonly<ResponsiveFragmentProps>): React.ReactNode => {
  const { hasSettings, hasOnlyHideSettings } = useMemo(() => {
    const settingsValueList = Object.values(enabledBreakpoints);
    const hasSettings = Boolean(settingsValueList.length);
    const hasOnlyHideSettings = settingsValueList.every((i) => !i);

    return {
      hasSettings,
      hasOnlyHideSettings,
    };
  }, [enabledBreakpoints]);

  const { activeBreakpoint } = useBreakpoints({
    active: hasSettings,
    target,
  });

  const shouldShow = useMemo<boolean>(() => {
    // init visible if the consumer provided no breakpoint settings
    // init visible if the consumer provided only show (true) breakpoint settings
    // init invisible if the consumer provided only hide (false) breakpoint settings
    // init invisible if the consumer provided mixed breakpoint settings
    let lastSetting = !hasSettings || hasOnlyHideSettings;
    let tmpShouldShow = true;

    eachBreakpoint((bp) => {
      lastSetting = enabledBreakpoints[bp] ?? lastSetting;

      if (activeBreakpoint === bp) tmpShouldShow = lastSetting;
    });

    return tmpShouldShow;
  }, [activeBreakpoint, enabledBreakpoints, hasOnlyHideSettings, hasSettings]);

  return shouldShow ? children : null;
};
