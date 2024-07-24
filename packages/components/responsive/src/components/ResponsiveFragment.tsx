import { type default as React, useEffect } from "react";
import { type ResponsiveTarget, type EnabledBreakpointsMapping } from "../types";
import { useResponsive } from "../hooks/responsive";

export interface ResponsiveFragmentProps extends EnabledBreakpointsMapping {
  target?: ResponsiveTarget;
  children?: React.ReactNode;
}

export const ResponsiveFragment = ({
  target = "viewport",
  children,
  ...enabledBreakpoints
}: Readonly<ResponsiveFragmentProps>): React.ReactNode => {
  const responsive = useResponsive(target);

  useEffect(() => {
    // eslint-disable-next-line no-console -- draft
    console.log("target", target);
  }, [target]);

  useEffect(() => {
    // eslint-disable-next-line no-console -- draft
    console.log("responsive", responsive);
  }, [responsive]);

  useEffect(() => {
    // eslint-disable-next-line no-console -- draft
    console.log("enabledBreakpoints", enabledBreakpoints);
  }, [enabledBreakpoints]);

  return children;
};
