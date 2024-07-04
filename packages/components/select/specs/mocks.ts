export const mockResizeObserver = (): void => {
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: class {
      public observe = (): void => undefined;
      public disconnect = (): void => undefined;
    },
  });
};
