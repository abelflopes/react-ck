import { addons } from "@storybook/manager-api";
import { CONFIG } from "./util";
import { registerManagerAddon } from "./modules/manager";
import { registerMarkdownAddon } from "./modules/markdown";
import { registerLabelsAddon } from "./modules/labels";

addons.register(CONFIG.id, () => {
  registerManagerAddon();
  registerMarkdownAddon();
  registerLabelsAddon();
});
