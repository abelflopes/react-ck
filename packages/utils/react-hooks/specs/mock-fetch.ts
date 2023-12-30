type MockFetch<T extends object> = () => Promise<{ json: () => T }>;

function mockImplementation<T extends object>(data: T | Error): MockFetch<T> {
  return jest.fn().mockImplementation(
    async (): ReturnType<MockFetch<T>> =>
      data instanceof Error
        ? // eslint-disable-next-line @typescript-eslint/return-await
          Promise.reject(data)
        : // eslint-disable-next-line @typescript-eslint/return-await
          Promise.resolve({
            json: () => data,
          }),
  );
}

export const mockFetch = <T extends object | Error>(data?: T): void => {
  Object.defineProperty(window, "fetch", {
    writable: true,
    value: mockImplementation(data ?? {}),
  });
};
