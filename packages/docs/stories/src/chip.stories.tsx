import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Chip } from "@react-ck/chip/src";

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: "Generic/Chip",
  ...configureStory(Chip, {
    decorators: [
      (Story) => (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    children: faker.lorem.words({ min: 1, max: 2 }),
  },
};
