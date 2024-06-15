import { getWebpackConfig } from "@react-ck/webpack-config";
import packageJson from "./package.json";
import { type Configuration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const baseCfg = getWebpackConfig({
  cssHashSalt: packageJson.name,
});

/**
 * TODO: optimizations
 * swc
 * cache
 * transpileOnly
 * react fast refresh
 * incremental
 * TS / HMR : https://www.npmjs.com/package/ts-loader#hot-module-replacement
 */

export default ((): Configuration & { devServer: DevServerConfiguration } => ({
  output: {
    filename: "index.js",
  },
  mode: baseCfg.mode,
  target: "web",
  module: baseCfg.module,
  resolve: baseCfg.resolve,
  plugins: [
    ...(baseCfg.plugins ?? []),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    allowedHosts: "all",
  },
  stats: "summary",
}))();
