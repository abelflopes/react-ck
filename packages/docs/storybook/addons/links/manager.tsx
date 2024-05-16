import React from "react";
import { addons, types } from "@storybook/manager-api";
// https://storybook.js.org/docs/react/addons/addon-knowledge-base#storybook-components
import { IconButton } from "@storybook/components";
// eslint-disable-next-line import/no-relative-packages, import/no-relative-parent-imports -- exception for root package / rule not relevant for this package
import packageJson from "../../../../../package.json";

addons.register("links-toolbar", () => {
  addons.add("links-toolbar/toolbar", {
    title: "Links Toolbar",
    type: types.TOOLEXTRA,
    render: () => (
      <>
        <IconButton
          placeholder="Report an issue"
          href={`${packageJson.homepage}/issues`}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          Report an Issue
        </IconButton>

        <IconButton
          placeholder="Make a Request"
          href={`${packageJson.homepage}/discussions`}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          Make a Request
        </IconButton>

        <IconButton
          placeholder="GitHub"
          href={packageJson.homepage}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          GitHub
        </IconButton>
      </>
    ),
  });
});
