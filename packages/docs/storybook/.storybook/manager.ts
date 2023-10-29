import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "RCK",
  brandUrl: "https://github.com/abelflopes/rck",
  brandImage: "./logo.svg",
  colorPrimary: "#783192",
  colorSecondary: "#59BCC8",
  textColor: "#1E2232",
});

addons.setConfig({
  theme,
  showToolbar: true,
});
