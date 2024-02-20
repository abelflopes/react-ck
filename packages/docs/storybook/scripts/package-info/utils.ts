import path from "node:path";
import fs from "node:fs";

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
