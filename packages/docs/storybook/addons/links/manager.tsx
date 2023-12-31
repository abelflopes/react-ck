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
        <IconButton href={`${packageJson.homepage}/issues`}>Report an Issue</IconButton>
        <IconButton href={`${packageJson.homepage}/discussions`}>Make a Request</IconButton>
        <IconButton href={`${packageJson.homepage}`}>Repo</IconButton>
      </>
    ),
  });
});
