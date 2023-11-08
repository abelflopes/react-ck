import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { Text } from "@rck/text/src";
import { configureStory } from "@rck/story-config";
import readme from "@rck/collapse/README.md";
import { Collapse } from "@rck/collapse/src";

type Story = StoryObj<typeof Collapse>;

const meta: Meta<typeof Collapse> = {
  title: "Generic/Collapse",
  ...configureStory(
    Collapse,
    {
      decorators: [
        (Story) => (
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        ),
      ],
    },
    {
      readme,
    },
  ),
};

export default meta;

export const Component: Story = {
  parameters: {
    layout: "padded",
  },
  args: {
    header: <Text type="h2">{faker.lorem.sentence()}</Text>,
    children: <Text>{faker.lorem.sentence()}</Text>,
  },
};
