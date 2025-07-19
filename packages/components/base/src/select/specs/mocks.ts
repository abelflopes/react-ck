export const mockResizeObserver = (): void => {
  Object.defineProperty(globalThis, "ResizeObserver", {
    writable: true,
    value: class {
      public observe = (): void => undefined;
      public disconnect = (): void => undefined;
    },
  });
};
