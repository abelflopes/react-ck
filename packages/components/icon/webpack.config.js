import { getWebpackConfig } from "@react-ck/webpack-config";
import packageJson from "./package.json";
export default getWebpackConfig({
    cssHashSalt: packageJson.name,
});
