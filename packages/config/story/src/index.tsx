import React from "react";
import type { Meta } from "@storybook/react";
import { Subtitle, Description, Primary, Controls, Markdown } from "@storybook/blocks";

export const configureStory = <T,>(
  component: T,
  data: Omit<Meta<T>, "component" | "title">,
  extra: { readme: string },
): Meta<T> => ({
  component,
  ...data,
  parameters: {
    ...data.parameters,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    docs: {
      ...data.parameters?.docs,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      page:
        data.parameters?.docs?.page ??
        (() => (
          <>
            <Markdown>{extra.readme}</Markdown>
            <Subtitle />
            <Description />
            <Primary />
            <Controls />
          </>
        )),
    },
  },
});
