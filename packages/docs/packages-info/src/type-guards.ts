import { type PackageJson } from "type-fest";
import { type PackageInfo } from "./types";

export function isPackageJson(v: unknown): v is PackageJson {
  return v !== null && typeof v === "object" && "name" in v && "version" in v;
}

export function asPackageJson(v: unknown): PackageJson {
  if (!isPackageJson(v)) throw new TypeError("Value is not package json format");

  return v;
}

export function isPackageInfo(v: unknown): v is PackageInfo {
  return v !== null && typeof v === "object" && "id" in v && "packageJson" in v && "markdown" in v;
}

export function isPackageInfoList(v: unknown): v is PackageInfo[] {
  return (
    v !== null && typeof v === "object" && Array.isArray(v) && v.every((i) => isPackageInfo(i))
  );
}
