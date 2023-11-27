import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { configureStory } from "@react-ck/story-config";
import { Skeleton } from "@react-ck/skeleton/src";

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  title: "Loading/Skeleton",
  ...configureStory(Skeleton, {
    parameters: {
      layout: "padded",
    },
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
    variation: "default",
  },
};
