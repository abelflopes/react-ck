import { type UseDataReturn } from "@react-ck/react-hooks/src";

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

export type DocAddonKey = keyof (typeof CONFIG)["markdownAddons"];

export const markdownAddons: DocAddonKey[] = ["readme", "changelog"];

export type LabelAddonKey = keyof (typeof CONFIG)["labelAddons"];

export const labelAddons: LabelAddonKey[] = ["version"];

export type PackageInfoState = Pick<UseDataReturn, "loading" | "error"> &
  Record<DocAddonKey | LabelAddonKey, string | undefined>;
