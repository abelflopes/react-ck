import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { Icon } from "@rck/icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "BsBellFill",
  },
};
