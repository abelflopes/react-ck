import type { Config } from "jest";

export const config: Config = {
  testEnvironment: "jsdom",
  coverageDirectory: "<rootDir>/specs/coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!<rootDir>/src/**/*.d.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>../../../node_modules/jest-css-modules",
  },
};
