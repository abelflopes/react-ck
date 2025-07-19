import { type PackageJson } from "type-fest";

export interface PackageInfo {
  id: string;
  packageJson: PackageJson & {
    style?: string;
    sass?: string;
  };
  markdown: Record<string, string>;
  path: string;
  subfolders: string[];
}
