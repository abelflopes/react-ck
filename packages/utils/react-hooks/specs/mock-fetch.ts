type MockFetch<T extends object> = () => Promise<{ json: () => T }>;

function mockImplementation<T extends object>(data: T | Error): MockFetch<T> {
  return jest.fn().mockImplementation((): ReturnType<MockFetch<T>> => {
    return data instanceof Error
      ? Promise.reject(data)
      : Promise.resolve({
          json: () => data,
        });
  });
}

export const mockFetch = <T extends object | Error>(data?: T): void => {
  Object.defineProperty(window, "fetch", {
    writable: true,
    value: mockImplementation(data ?? {}),
  });
};
