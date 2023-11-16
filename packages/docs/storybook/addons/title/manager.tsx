import React from "react";
import { addons, types } from "@storybook/manager-api";
import * as Events from "@storybook/core-events";

addons.register("page-title", (api) => {
  api.on(Events.CURRENT_STORY_WAS_SET, () => {
    const { title } = api.getCurrentStoryData();
    const [name] = title.split("/").reverse();

    document.title = "RCK | " + name;
  });
});
