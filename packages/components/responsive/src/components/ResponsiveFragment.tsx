import { type default as React, useMemo } from "react";
import { type ResponsiveTarget, type EnabledBreakpointsMapping } from "../types";
import { useBreakpoints } from "../hooks/breakpoints";
import { eachBreakpoint } from "../utils";

export interface ResponsiveFragmentProps extends Partial<EnabledBreakpointsMapping> {
  target?: ResponsiveTarget;
  children?: React.ReactNode;
}

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

  const { activeBreakpoint } = useBreakpoints(hasSettings, target);

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
