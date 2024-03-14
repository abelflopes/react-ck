import path from "path";
import fs from "fs";
import { globSync } from "glob";
import { execSync } from "child_process";
import bunyan from "bunyan";
import bformat from "bunyan-format";

// Config

const currPackagePath = path.resolve(__dirname, "../package.json");
const packagesRoot = path.resolve(__dirname, "../../../");
const destTsFile = path.resolve(__dirname, "../src/index.ts");
const destScssFile = path.resolve(__dirname, "../src/styles/index.scss");

// Util

const stripSpecialChars = (value: string): string => value.replace(/[^0-9a-zA-Z]+/gu, "");

const logger = bunyan.createLogger({
  name: "Library prebuild",
  level: "debug",
  stream: bformat({ outputMode: "short" }),
});

type PackageJson = {
  name?: string;
  version?: string;
  files?: string[];
  main?: string;
  types?: string;
  sass?: string;
  dependencies?: Record<string, string>;
};

function isPackageJson(value: unknown): value is PackageJson {
  return typeof value === "object" && value !== null && "name" in value && "version" in value;
}

function asPackageJson(value: unknown): PackageJson {
  if (!isPackageJson(value)) throw new Error("Invalid package.json");

  return value;
}

// Get packages

logger.info("Finding packages...");

const find = globSync(path.resolve(packagesRoot, "./{utils,components,providers}/*/package.json"));

logger.debug("Found packages", find);

// Get packages data

logger.info("Parsing packages...");

const parsedPackages = find.map((packagePath) => {
  const folder = path.dirname(packagePath);
  const { name, version, main, types, sass, files } = asPackageJson(
    JSON.parse(fs.readFileSync(packagePath, "utf-8")),
  );

  return {
    path: packagePath,
    folder,
    name,
    version,
    main,
    types,
    sass,
    files,
  };
});

logger.debug("Parsed packages", parsedPackages);

// Throw error if files configuration does not match the dist fields
parsedPackages.forEach(({ path, types, main, sass, files }) => {
  const distFiles = [main, types, sass];

  if (
    distFiles.some(
      (i) => i && !files?.some((f) => stripSpecialChars(i).includes(stripSpecialChars(f))),
    )
  )
    throw new Error(`Misconfigured package, missing folders in "files" property: ${path}`);
});

logger.warn(
  "Packages without type exports: ",
  parsedPackages
    .filter((i) => !i.types)
    .map((i) => i.name)
    .join(""),
);

logger.warn(
  "Packages without style exports:",
  parsedPackages
    .filter((i) => !i.sass)
    .map((i) => i.name)
    .join(" "),
);

// Install packages

const currPackage = asPackageJson(JSON.parse(fs.readFileSync(currPackagePath, "utf-8")));

const packagesToRemove = Object.keys(currPackage.dependencies ?? {});

const uninstallCommand = `npm uninstall --save ${packagesToRemove.map((name) => name).join(" ")}`;

if (packagesToRemove.length) {
  logger.debug("Uninstalling previous packages", packagesToRemove);
  execSync(uninstallCommand, { stdio: "inherit" });
}

const packagesToInstall = parsedPackages.map(({ name, version }) => `${name}@^${version}`);

const installCommand = `npm i --save ${packagesToInstall.join(" ")}`;

logger.info("Installing packages", packagesToInstall);

execSync(installCommand, { stdio: "inherit" });

// Generate ts files

logger.info("Generating TS file...", destTsFile);

let tsFileContents = `/* This file is automatically generated */\n\n`;

tsFileContents += parsedPackages
  .filter((i) => i.types)
  .map((i) => `export * from "${i.name}";\n`)
  .join("\n");

fs.mkdirSync(path.dirname(destTsFile), { recursive: true });
fs.writeFileSync(destTsFile, tsFileContents, {
  encoding: "utf-8",
});

// Generate scss files

logger.info("Generating SCSS file...", destScssFile);

let scssFileContents = `/* This file is automatically generated */\n\n`;

scssFileContents += parsedPackages
  .filter((i) => i.sass)
  .map((i) => `@import "${i.name}";\n`)
  .join("\n");

fs.mkdirSync(path.dirname(destScssFile), { recursive: true });
fs.writeFileSync(destScssFile, scssFileContents, {
  encoding: "utf-8",
});

// Add changes to git

try {
  logger.info("Adding to git...", currPackagePath);

  execSync(`git add ${currPackagePath}`, { stdio: "inherit" });

  logger.info("Sending commit to git...", currPackagePath);

  execSync(`git commit -m "feat(react-ck): update library packages"`, { stdio: "inherit" });
} catch (error) {
  logger.error(error instanceof Error ? error.message : error);
}

// Finished

logger.info("Done");
