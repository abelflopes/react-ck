import React from "react";
import { addons, types } from "storybook/manager-api";
// https://storybook.js.org/docs/react/addons/addon-knowledge-base#storybook-components
import { IconButton, Link } from "storybook/internal/components";

import packageJson from "../../../../../package.json";

addons.register("links-toolbar", () => {
  addons.add("links-toolbar/toolbar", {
    title: "Links Toolbar",
    type: types.TOOLEXTRA,
    render: (): React.ReactNode => {
      return (
        <>
          <Link target="blank" href={`${packageJson.homepage}/issues`}>
            <IconButton>Report an Issue</IconButton>
          </Link>

          <Link target="blank" href={`${packageJson.homepage}/discussions`}>
            <IconButton>Make a Request</IconButton>
          </Link>

          <Link target="blank" href={packageJson.homepage}>
            <IconButton>GitHub</IconButton>
          </Link>
        </>
      );
    },
  });
});
