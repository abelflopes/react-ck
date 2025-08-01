import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "React CK",
  brandUrl: "/",
  brandImage: "./logo.svg",
  colorPrimary: "#783192",
  colorSecondary: "#59BCC8",
  textColor: "#1E2232",
  appBorderColor: "rgb(0 0 0 / 10%)",
  inputBorderRadius: 0,
  appBg: "#f9f9f9",
});

addons.setConfig({
  theme,
  showToolbar: true,
});
