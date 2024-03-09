import { addons } from "@storybook/manager-api";
import * as Events from "@storybook/core-events";

addons.register("page-title", (api) => {
  api.on(Events.CURRENT_STORY_WAS_SET, () => {
    const { title } = api.getCurrentStoryData();
    const [name] = [...title.split("/")].reverse();

    document.title = `React CK | ${name}`;
  });
});
