import { getWebpackConfig } from "@rck/webpack";
import packageJson from "./package.json";

export default getWebpackConfig({
  packageName: packageJson.name,
});
