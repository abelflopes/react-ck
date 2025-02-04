import path from "path";
import fs from "fs";
import { globSync } from "glob";
import { execSync } from "child_process";
import {
  currPackagePath,
  destCssFile,
  destIconsFolder,
  destScssFile,
  destTsFile,
  logger,
  packagesRoot,
  projectRoot,
  sourceIconsFolder,
} from "./common";

// Util

const stripSpecialChars = (value: string): string => value.replace(/[^0-9a-zA-Z]+/gu, "");

type PackageJson = {
  name?: string;
  version?: string;
  files?: string[];
  main?: string;
  types?: string;
  sass?: string;
  style?: string;
  dependencies?: Record<string, string>;
};

function isPackageJson(value: unknown): value is PackageJson {
  return typeof value === "object" && value !== null && "name" in value && "version" in value;
}

function asPackageJson(value: unknown): PackageJson {
  if (!isPackageJson(value)) throw new Error("Invalid package.json");

  return value;
}

const errors: string[] = [];
const warnings: string[] = [];

// Get packages

logger.info("Finding packages...");

const find = globSync(path.resolve(packagesRoot, "./{utils,components,providers}/*/package.json"));

logger.debug("Found packages", find);

// Get packages data

logger.info("Parsing packages...");

const parsedPackages = find.map((packagePath) => {
  const folder = path.dirname(packagePath);
  const { name, version, main, types, sass, files, style } = asPackageJson(
    JSON.parse(fs.readFileSync(packagePath, "utf-8")),
  );

  const filesList = globSync(path.resolve(folder, "**/*"));
  const sourceFilesList = filesList.filter((i) => i.includes(path.resolve(folder, "/src")));
  const distFilesList = filesList.filter((i) => i.includes(path.resolve(folder, "/dist")));

  return {
    packagePath,
    folder,
    name,
    version,
    main,
    types,
    sass,
    style,
    files,
    filesList,
    sourceFilesList,
    distFilesList,
  };
});

// Throw error if files configuration does not match the dist fields
parsedPackages.forEach(
  // eslint-disable-next-line complexity
  ({
    packagePath,
    types,
    main,
    sass,
    style,
    files,
    folder,
    name,
    sourceFilesList,
    distFilesList,
  }) => {
    const distFiles = { main, types, sass, style };

    Object.entries(distFiles)
      .filter(([, value]) => Boolean(value))
      .forEach(([key, value]) => {
        const p = path.resolve(folder, String(value));
        if (!fs.existsSync(p)) errors.push(`missing "${key}" file mentioned in ${packagePath}`);
      });

    if (
      Object.values(distFiles).some(
        (i) => i && !files?.some((f) => stripSpecialChars(i).includes(stripSpecialChars(f))),
      )
    )
      errors.push(`Misconfigured package, missing folders in "files" property: ${packagePath}`);

    if (sourceFilesList.some((i) => i.includes(".ts")) && !main)
      warnings.push(`Package "${name}" has no main exports`);

    if (sourceFilesList.some((i) => i.includes(".ts")) && !types)
      warnings.push(`Package "${name}" has no types exports`);

    if (sourceFilesList.some((i) => i.includes(".scss")) && !sass)
      warnings.push(`Package "${name}" has no sass exports`);

    if (sourceFilesList.some((i) => i.includes("shared.scss")) && !sass)
      errors.push(`Package "${name}" his not exporting shared.scss`);

    if (distFilesList.some((i) => i.includes(".css")) && !style)
      errors.push(`Package "${name}" has no style exports`);
  },
);

if (warnings.length) logger.warn(warnings.join("\n"));

if (errors.length) {
  logger.error(errors.join("\n"));

  throw new Error(errors.join("\n"));
}

// Install packages

const currPackage = asPackageJson(JSON.parse(fs.readFileSync(currPackagePath, "utf-8")));
const packagesToRemove = Object.keys(currPackage.dependencies ?? {});
const uninstallCommand = `npm uninstall --save ${packagesToRemove.map((name) => name).join(" ")}`;
const packagesToInstall = parsedPackages.map(({ name, version }) => `${name}@^${version}`);
const installCommand = `npm i --save ${packagesToInstall.join(" ")}`;

if (packagesToRemove.length) {
  logger.debug("Uninstalling previous packages", packagesToRemove);
  execSync(uninstallCommand, { stdio: "inherit" });
}

logger.info("Installing packages", packagesToInstall);

execSync(installCommand, { stdio: "inherit" });

// Update root package lock

execSync("npm i", { stdio: "inherit", cwd: projectRoot });

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
  .map((i) => `@forward "${i.name}";\n`)
  .join("\n");

fs.mkdirSync(path.dirname(destScssFile), { recursive: true });
fs.writeFileSync(destScssFile, scssFileContents, {
  encoding: "utf-8",
});

logger.info("Generating CSS file...", destCssFile);

let cssFileContents = `/* This file is automatically generated */\n\n`;

cssFileContents += parsedPackages
  .filter((i) => i.style)
  .map((i) => `@import "${i.name}";\n`)
  .join("\n");

fs.mkdirSync(path.dirname(destCssFile), { recursive: true });
fs.writeFileSync(destCssFile, cssFileContents, {
  encoding: "utf-8",
});

// Copy Icons

logger.info("Copying icons...");

fs.cpSync(sourceIconsFolder, destIconsFolder, { recursive: true });

// Finished

logger.info("Done");
