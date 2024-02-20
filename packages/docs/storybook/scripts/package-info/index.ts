import path from "node:path";
import { glob } from "glob";
import { asyncReadFile, asyncWriteFile } from "./utils";
import { type PackageInfo } from "./types";
import { asPackageJson } from "./type-guards";

void (async (): Promise<void> => {
  const outDir = path.resolve(process.cwd(), "./public");
  const outFile = path.resolve(outDir, "./packages-info.json");
  const packagesDir = path.resolve(process.cwd(), "../../");

  const packageJsonPaths = await glob(
    path.resolve(packagesDir, "./{components,utils,providers,library}/*/package.json"),
    {
      ignore: "/**/node_modules/*",
    },
  );

  const info = await Promise.all(
    packageJsonPaths.map(async (packagePath): Promise<PackageInfo> => {
      const folder = path.dirname(packagePath);

      const packageJson = await asyncReadFile(packagePath);

      const packageJsonData = asPackageJson(JSON.parse(packageJson));

      const markdownFiles = await glob(path.resolve(folder, "./**/*.md"), {
        ignore: "/**/node_modules/*",
      });

      const markdownContent = Object.fromEntries(
        await Promise.all(
          markdownFiles.map(async (filePath): Promise<[string, string]> => {
            const { dir, name } = path.parse(path.relative(folder, filePath));

            const key = [dir, name]
              .filter((i) => i.length)
              .join("-")
              .replace(/\s/gu, "-")
              .toLowerCase();

            const content = await asyncReadFile(filePath);

            return [key, content];
          }),
        ),
      );

      return {
        id: packageJsonData.name ?? path.basename(folder),
        packageJson: packageJsonData,
        markdown: markdownContent,
      };
    }),
  );

  await asyncWriteFile(outFile, JSON.stringify(info));
})();
