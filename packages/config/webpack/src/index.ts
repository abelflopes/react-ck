import { type Configuration } from "webpack";

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
    (() =>
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production"
        ? process.env.NODE_ENV
        : (() => {
            throw new Error("Invalid webpack mode");
          })())();

  return {
    mode,
    output: {
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
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
                sourceMap: mode === "development",
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: "tsconfig.build.json",
            compilerOptions: {
              sourceMap: mode === "development",
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: ["react"],
    stats: mode === "production" ? "normal" : "minimal",
  };
};
