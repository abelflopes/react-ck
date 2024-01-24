import { getWebpackConfig } from "@react-ck/webpack-config";
import packageJson from "./package.json";
import { type Configuration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";

console.log("__dirname", path.resolve(__dirname, "./index.html"));

const baseCfg = getWebpackConfig({
  cssHashSalt: packageJson.name,
});

/**
 * TODO: optimisations
 * swc
 * cache
 * transpileOnly
 * react fast refresh
 * incremental
 */

// eslint-disable-next-line unicorn/no-unreadable-iife
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
}))();
