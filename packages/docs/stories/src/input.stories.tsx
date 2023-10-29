import React from "react";
import { Input } from "@rck/input/src/index";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    required: true,
    placeholder: "Username",
  },
};
