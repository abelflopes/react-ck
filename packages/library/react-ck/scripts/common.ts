import path from "path";
import bunyan from "bunyan";
import bformat from "bunyan-format";

// Config

export const projectRoot = path.resolve(__dirname, "../../../../");

export const rootPackageLock = path.resolve(projectRoot, "./package-lock.json");

export const currPackagePath = path.resolve(__dirname, "../package.json");

export const packagesRoot = path.resolve(__dirname, "../../../");

export const destTsFile = path.resolve(__dirname, "../src/index.ts");

export const destScssFile = path.resolve(__dirname, "../src/styles/index.scss");

// Util

export const logger = bunyan.createLogger({
  name: "Library prebuild",
  level: "debug",
  stream: bformat({ outputMode: "short" }),
});
