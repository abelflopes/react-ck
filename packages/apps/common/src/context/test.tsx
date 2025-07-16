import React, { createContext, useContext } from "react";

export interface TestContextProps {
  string: string;
  object: object;
}

const defaultProps: TestContextProps = {
  string: "test",
  object: {
    abc: "def",
    ghi: 123,
  },
};

export const TestContext = createContext<TestContextProps>({
  ...defaultProps,
});

export const TestContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <TestContext.Provider value={defaultProps}>{children}</TestContext.Provider>
);

export const useTestContext = (): TestContextProps => useContext(TestContext);
