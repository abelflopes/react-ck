import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { configureStory } from "@rck/story-config";
import readme from "@rck/icon/README.md";
import { Icon } from "@rck/icon/src";

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: "Generic/Icon",
  ...configureStory(
    Icon,
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
    name: "bell-filled",
  },
};
