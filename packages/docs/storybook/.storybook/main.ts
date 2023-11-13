import { StorybookConfig } from "@storybook/react-webpack5";
import { ProgressPlugin } from "webpack";
import { getWebpackConfig } from "@react-ck/webpack-config";

const config: StorybookConfig = {
  stories: ["../../pages/src/**/*.mdx", "../../stories/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "../addons/links",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
    "storybook-addon-performance",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true,
      strictMode: true,
      builder: {
        useSWC: true,
        lazyCompilation: true,
        fsCache: true,
      },
    },
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    check: true,
    skipBabel: true,
  },
  core: {
    disableTelemetry: true,
  },
  // Reduce log noise
  logLevel: "warn",
  // Copy assets to app dist public folder
  staticDirs: [
    "../../pages/assets",
    {
      from: "../../../../docs/assets",
      to: "/docs/assets",
    },
  ],
  // Extend / verride webpack config
  async webpackFinal(config) {
    const packagesConfig = getWebpackConfig();

    // Add same styling rules as used on package compilation
    const cssRule = packagesConfig.module?.rules?.find(
      (i) => !!i && i !== "..." && "test" in i && i.test?.toString() === "/\\.s[ac]ss$/i",
    );
    config.module?.rules?.push(cssRule);

    // Reduce log noise
    config.stats = "summary";

    // Remove progress plugin as it pollutes lerna stream
    config.plugins = config.plugins?.filter((i) => !(i instanceof ProgressPlugin));

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        react: "react",
      },
    };

    return config;
  },
};

export default config;
