import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { configureStory } from "@rck/story-config";
import readme from "@rck/divider/README.md";
import { Divider } from "@rck/divider/src";

type Story = StoryObj<typeof Divider>;

const meta: Meta<typeof Divider> = {
  title: "Generic/Divider",
  ...configureStory(
    Divider,
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

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    type: "vertical",
  },
};
