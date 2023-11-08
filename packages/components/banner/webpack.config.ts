import { getWebpackConfig } from "@rck/webpack-config";
import packageJson from "./package.json";

export default getWebpackConfig({
  cssHashSalt: packageJson.name,
});
