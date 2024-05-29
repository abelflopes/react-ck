import React from "react";
import { type Meta } from "@storybook/react";
import {
  Subtitle,
  Description,
  Primary,
  Controls,
  ArgsTable,
  Title,
  Stories,
} from "@storybook/blocks";
import { capitalCase } from "change-case";

interface ConfigureStoryExtra {
  subComponents?: unknown[];
  type?: "Component" | "Hook";
}

function isComponent(v: unknown): v is { displayName: string } {
  return v !== null && typeof v === "function" && "displayName" in v;
}

/**
 * Manual subcomponents implementation, reason: https://github.com/storybookjs/storybook/issues/20782#issuecomment-1482771013
 * More: https://storybook.js.org/docs/7.0/react/writing-stories/stories-for-multiple-components
 */

export const configureStory = <T,>(
  component: T,
  data: Omit<Meta<T>, "component" | "title">,
  extra?: ConfigureStoryExtra,
): Meta<T> => ({
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
              React CK | {isComponent(component) ? capitalCase(component.displayName) : ""}{" "}
              {extra?.type ?? "Component"}{" "}
            </Title>

            <Subtitle />

            <Description />

            <Primary />

            {isComponent(component) && <h3>{component.displayName} Props</h3>}

            <Controls />

            {extra?.subComponents?.filter(isComponent).map((i) => (
              <React.Fragment key={JSON.stringify(i)}>
                <h3>{i.displayName} Props</h3>

                <ArgsTable of={i} />
              </React.Fragment>
            ))}

            <Stories title="" includePrimary={false} />
          </>
        )),
    },
  },
});
