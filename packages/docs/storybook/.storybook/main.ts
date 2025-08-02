import type { StorybookConfig } from "@storybook/react-vite";
import { getExtendedViteConfig } from "@react-ck/storybook-utils/vite";

const config: StorybookConfig = {
  stories: ["../../pages/src/**/*.mdx", "../../stories/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "../addons/links",
    "../addons/package-info",
    "../addons/title",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [
    "../public",
    "../../pages/assets",
    "../../packages-info/dist",
    {
      from: "../../../../docs/assets",
      to: "/docs/assets",
    },
  ],
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      shouldIncludePropTagMap: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      EXPERIMENTAL_useProjectService: true,
    },
  },
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, await getExtendedViteConfig());
  },
};

export default config;
