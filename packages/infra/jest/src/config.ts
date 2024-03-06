import { type Config } from "jest";
import path from "path";

export const config: Config = {
  testEnvironment: "jsdom",
  coverageDirectory: "<rootDir>/specs/coverage",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!<rootDir>/src/**/*.d.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>../../../node_modules/jest-css-modules",
  },
  setupFiles: [path.join(__dirname, "setup.js")],
};
