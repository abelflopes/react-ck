import type { Config } from "jest";
import { config as sharedConfig } from "@react-ck/jest-config";

const config: Config = {
  ...sharedConfig,
  // Necessary for change case dependency
  // https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  setupFiles: ["./specs/setup/index.js"],
};

export default config;
