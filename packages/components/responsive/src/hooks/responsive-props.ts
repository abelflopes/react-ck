import { type BaseProps, type ResponsiveProps } from "../types";

export interface UseResponsiveProps<T extends BaseProps> extends ResponsiveProps<T> {
  baseProps: T;
}

export const useResponsiveProps = <T extends BaseProps>({
  baseProps,
  responsive,
}: UseResponsiveProps<T>): T => {
  // eslint-disable-next-line no-console -- draft
  console.log("baseProps, responsive", baseProps, responsive);
  return baseProps;
};
