import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { configureStory } from "@react-ck/story-config";
import { Spinner } from "@react-ck/spinner/src";

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: "Loading/Spinner",
  ...configureStory(Spinner, {
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
  args: {},
};
