import path from "node:path";

export const packagesInfoDir = path.resolve(__dirname, "../");
export const rootPackagesFolder = path.resolve(packagesInfoDir, "../../");

export const packageInfoOutputDir = path.resolve(packagesInfoDir, "./dist");
export const packageInfoOutputFile = path.resolve(packageInfoOutputDir, "./packages-info.json");
