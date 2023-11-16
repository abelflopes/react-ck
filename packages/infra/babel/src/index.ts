import type { TransformOptions } from "babel__core";

// https://jestjs.io/docs/getting-started#using-typescript

const config: TransformOptions = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};

export default config;
