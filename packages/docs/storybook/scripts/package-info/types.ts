import { PackageJson } from "type-fest";

export interface PackageInfo {
  id: string;
  packageJson: PackageJson;
  markdown: Record<string, string>;
}
