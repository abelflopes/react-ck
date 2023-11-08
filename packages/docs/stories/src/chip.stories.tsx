import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { Chip } from "@rck/chip/src";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: faker.lorem.words({ min: 1, max: 2 }),
  },
};
