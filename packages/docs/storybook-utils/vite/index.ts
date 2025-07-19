import { type Alias, type UserConfig } from "vite";
import { getPackagesInfo } from "@react-ck/packages-info";
import path from "node:path";

/**
 * This function is used to extend the vite config with the react-ck packages.
 * It is used in the storybook config to resolve the paths to the react-ck packages.
 */

export const getExtendedViteConfig = async () => {
  const packagesInfo = await getPackagesInfo();

  const reactCkResolveAliases = packagesInfo
    .filter((i) => i.packageJson.main)
    .map<Alias>((i) => ({
      find: i.id,
      replacement: i.id,
      customResolver: (source, importer) => {
        const isDeepPath = source.split("/").length > 2;

        const isScss = importer?.endsWith(".scss");
        const isIcon = source.includes("@react-ck/icon/icons/");

        const resolved = {
          main: `${i.path}/index.ts`,
          sass: i.packageJson.sass && path.join(i.path, i.packageJson.sass),
          icon: isIcon && `${source.split(i.id).join(i.path)}.js`,
        };

        if (isScss && !isDeepPath) return resolved.sass;

        if (isIcon) return resolved.icon;

        return resolved.main;
      },
    }));

  const extendedConfig: UserConfig = {
    resolve: {
      alias: reactCkResolveAliases,
    },
  };

  return extendedConfig;
};
