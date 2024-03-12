import { type Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import path from "node:path";
import fs from "node:fs";

// SCSS - https://webpack.js.org/loaders/sass-loader/
// CSS MODULES - https://webpack.js.org/loaders/css-loader/#modules
// Optimization - https://webpack.js.org/guides/build-performance/

export interface WebpackConfigOptions {
  mode?: Configuration["mode"];
  cssHashSalt?: string;
}

export const getWebpackConfig = (options?: WebpackConfigOptions): Configuration => {
  const mode: Configuration["mode"] =
    options?.mode ??
    // Fallback to node env if not defined
    ((): "development" | "production" => {
      if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")
        return process.env.NODE_ENV;

      throw new Error("invalid NODE_ENV");
    })();

  const mainNodeModulesFolder = path.resolve(process.cwd(), "../../../node_modules");

  if (!fs.existsSync(mainNodeModulesFolder)) throw new Error("main node js folder does not exist");

  return {
    mode,
    output: {
      filename: "index.js",
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true,
    },
    optimization: {
      minimize: mode === "production",
    },
    target: "web",
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/iu,
          use: [
            {
              loader: "style-loader",
              options: {
                attributes: {
                  "data-module": options?.cssHashSalt,
                },
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  // Detect automatically if should apply CSS modules parsing or not
                  auto: true,
                  // Class name hashing mode
                  localIdentName:
                    mode === "development" ? "[file]__[local]__[hash:base64:5]" : "[hash:base64]",
                  // Use package json name to create unique salt
                  // Solves conflicts of equal classname compilation from two different builds
                  localIdentHashSalt: options?.cssHashSalt,
                },
                sourceMap: true,
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.tsx?$/u,
          exclude: /node_modules/u,
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.build.json",
            compilerOptions: {
              sourceMap: true,
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: [
      nodeExternals({
        additionalModuleDirs: [mainNodeModulesFolder],
      }),
    ],
    externalsPresets: {
      web: true,
    },
    stats: mode === "development" ? "normal" : "summary",
  };
};
