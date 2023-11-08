import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { Divider } from "@rck/divider/src";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const vertical: Story = {
  args: {
    type: "vertical",
  },
};
