import { config as baseConfig } from "@react-ck/jest-config";
import { type Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  moduleNameMapper: baseConfig.moduleNameMapper,
  // ...baseConfig,
  // transformIgnorePatterns: ["/node_modules/(?!(change-case)/)"],
};

export default config;
