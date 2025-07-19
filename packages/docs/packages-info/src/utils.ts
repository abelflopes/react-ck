import path from "node:path";
import fs from "node:fs";
import { PackageInfo } from "./types";
import { glob } from "glob";
import { asPackageJson } from "./type-guards";
import { rootPackagesFolder } from "./paths";

export const asyncReadFile = async (file: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf8",
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      },
    );
  });

export const asyncWriteFile = async (file: string, content: string): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    const folder = path.dirname(file);

    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    fs.writeFile(
      file,
      content,
      {
        encoding: "utf8",
      },
      (err) => {
        if (err) reject(err);
        resolve();
      },
    );
  });
};

export const getPackagesInfo = async (): Promise<PackageInfo[]> => {
  const packageJsonPaths = await glob(
    path.resolve(rootPackagesFolder, "./{components,utils,providers,library}/*/package.json"),
    {
      ignore: "/**/node_modules/*",
    },
  );

  return Promise.all(
    packageJsonPaths.map(async (packagePath): Promise<PackageInfo> => {
      const folder = path.dirname(packagePath);

      const packageJson = await asyncReadFile(packagePath);

      const packageJsonData = asPackageJson(JSON.parse(packageJson));

      const markdownFiles = await glob(path.resolve(folder, "./**/*.md"), {
        ignore: "/**/node_modules/*",
      });

      const subfolders = (
        await glob(path.resolve(folder, "./**/"), {
          ignore: ["/node_modules/**", "/dist/**", "/**/specs/**", "/**/*.*"],
        })
      )
        .map((subfolder) => path.relative(folder, subfolder))
        .filter(Boolean);

      const markdownContent = Object.fromEntries(
        await Promise.all(
          markdownFiles.map(async (filePath): Promise<[string, string]> => {
            const { dir, name } = path.parse(path.relative(folder, filePath));

            const key = [dir, name]
              .filter((i) => i.length)
              .join("-")
              .replaceAll(/\s/gu, "-")
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
        path: folder,
        subfolders,
      };
    }),
  );
};
