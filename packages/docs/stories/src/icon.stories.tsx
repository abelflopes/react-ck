import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { configureStory } from "@react-ck/story-config";
import readme from "@react-ck/icon/README.md";
import { Icon } from "@react-ck/icon/src";

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
