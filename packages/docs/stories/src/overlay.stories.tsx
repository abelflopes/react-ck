import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { Overlay } from "@rck/overlay/src";

const meta: Meta<typeof Overlay> = {
  title: "Components/Overlay",
  component: Overlay,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "medium",
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: "30px" }}>
          <div style={{ position: "relative", height: "90px" }}>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Dark: Story = {};

export const Light: Story = {
  args: {
    skin: "light",
  },
};
