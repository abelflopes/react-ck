import type { PackageInfo } from "@react-ck/packages-info/src/types";
import type { UseDataReturn } from "./modules/manager";

export const CONFIG = {
  id: "package-info",
  commonAddons: {
    manager: {
      id: "package-info/manager",
      title: "Package Info Manager",
      route: "manager",
    },
  },
  markdownAddons: {
    changelog: {
      id: "package-info/changelog",
      title: "Changelog",
      route: "changelog",
    },
    readme: {
      id: "package-info/readme",
      title: "Documentation",
      route: "readme",
    },
  },
  labelAddons: {
    version: {
      id: "package-info/version",
      title: "Version",
    },
  },
};

export type PackageInfoState = Pick<UseDataReturn, "loading" | "error"> & {
  changelog?: string;
  readme?: string;
  version?: string;
  currPackageInfo?: PackageInfo;
  packagesInfo: PackageInfo[];
};
