import { packageInfoOutputFile } from "./paths";
import { asyncWriteFile, getPackagesInfo } from "./utils";

void (async (): Promise<void> => {
  const info = await getPackagesInfo();

  await asyncWriteFile(packageInfoOutputFile, JSON.stringify(info, null, 2));
})();
