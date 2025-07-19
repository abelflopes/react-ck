import path from "node:path";
import bunyan from "bunyan";
import bformat from "bunyan-format";

// Config

export const projectRoot = path.resolve(__dirname, "../../../../");

export const rootPackageLock = path.resolve(projectRoot, "./package-lock.json");

export const packagesRoot = path.resolve(projectRoot, "packages");

export const currPackagePath = path.resolve(__dirname, "../package.json");

export const currPackageFolder = path.dirname(currPackagePath);

export const destTsFile = path.resolve(currPackageFolder, "src/index.ts");

export const destScssFile = path.resolve(currPackageFolder, "src/styles/index.scss");

export const destCssFile = path.resolve(currPackageFolder, "src/styles/index.css");

export const sourceIconsFolder = path.resolve(packagesRoot, "components/icon/icons");

export const destIconsFolder = path.resolve(currPackageFolder, "icons");

// Util

export const logger = bunyan.createLogger({
  name: "Library prebuild",
  level: "debug",
  stream: bformat({ outputMode: "short" }),
});
