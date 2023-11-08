import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { configureStory } from "@rck/story-config";
import readme from "@rck/chip/README.md";
import { Chip } from "@rck/chip/src";

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: "Generic/Chip",
  ...configureStory(
    Chip,
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
    children: faker.lorem.words({ min: 1, max: 2 }),
  },
};
