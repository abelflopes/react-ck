import React from "react";
import type { Meta } from "@storybook/react-vite";
import {
  Subtitle,
  Description,
  Primary,
  Controls,
  Title,
  Stories,
} from "@storybook/addon-docs/blocks";
import { capitalCase } from "change-case";

interface ConfigureStoryExtra {
  type?: "Component" | "Hook";
}

function isComponent(v: unknown): v is { displayName?: string; name?: string } {
  return v !== null && typeof v === "function" && ("displayName" in v || "name" in v);
}

/**
 * Manual subcomponents implementation, reason: https://github.com/storybookjs/storybook/issues/20782#issuecomment-1482771013
 * More: https://storybook.js.org/docs/7.0/react/writing-stories/stories-for-multiple-components
 */

export const configureStory = <T,>(
  component: T,
  data: Omit<Meta<T>, "component" | "title">,
  extra?: ConfigureStoryExtra,
): Meta<T> => {
  return {
    component,
    ...data,
    parameters: {
      ...data.parameters,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- lack of storybook types
      docs: {
        ...data.parameters?.docs,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- lack of storybook types
        page:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- lack of storybook types
          data.parameters?.docs?.page ??
          ((): React.ReactElement => (
            <>
              <Title>
                React CK |{" "}
                {isComponent(component)
                  ? capitalCase(component.displayName || component.name || "")
                  : ""}{" "}
                {extra?.type ?? "Component"}{" "}
              </Title>

              <Subtitle />

              <Description />

              <Primary />

              <h3>Props</h3>

              <Controls />

              <Stories
                title={
                  <>
                    <hr />
                    <br />
                  </>
                }
                includePrimary={false}
              />
            </>
          )),
      },
    },
  };
};
