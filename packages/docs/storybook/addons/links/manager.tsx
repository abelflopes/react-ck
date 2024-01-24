import React from "react";
import { addons, types } from "@storybook/manager-api";
// https://storybook.js.org/docs/react/addons/addon-knowledge-base#storybook-components
import { IconButton } from "@storybook/components";
import packageJson from "../../../../../package.json";

addons.register("links-toolbar", () => {
  addons.add("links-toolbar/toolbar", {
    title: "Links Toolbar",
    type: types.TOOLEXTRA,
    render: () => (
      <>
        <IconButton placeholder="Report an issue" href={`${packageJson.homepage}/issues`}>
          Report an Issue
        </IconButton>
        <IconButton placeholder="Make a Request" href={`${packageJson.homepage}/discussions`}>
          Make a Request
        </IconButton>
        <IconButton placeholder="Repo" href={`${packageJson.homepage}`}>
          Repo
        </IconButton>
      </>
    ),
  });
});
