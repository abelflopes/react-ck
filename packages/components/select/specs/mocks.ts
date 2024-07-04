type MockFetch<T extends object> = () => Promise<{ json: () => T }>;

function mockResizeObserverImplementation<T extends object>(data: T | Error): MockFetch<T> {
  return jest.fn().mockImplementation(
    async (): ReturnType<MockFetch<T>> =>
      data instanceof Error
        ? Promise.reject(data)
        : Promise.resolve({
            json: () => data,
          }),
  );
}

export const mockResizeObserver = (): void => {
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: class {
      public observe = (): void => undefined;
      public disconnect = (): void => undefined;
    },
  });
};
