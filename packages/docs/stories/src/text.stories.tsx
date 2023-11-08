import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { configureStory } from "@rck/story-config";
import readme from "@rck/text/README.md";
import { Text } from "@rck/text/src";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Core/Typography",
  ...configureStory(
    Text,
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
  args: {
    children: faker.lorem.sentence(),
  },
};
