import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { configureStory } from "@rck/story-config";
import readme from "@rck/overlay/README.md";
import { Overlay } from "@rck/overlay/src";

type Story = StoryObj<typeof Overlay>;

const meta: Meta<typeof Overlay> = {
  title: "Utility/Overlay",
  ...configureStory(
    Overlay,
    {
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
    },
    {
      readme,
    },
  ),
};

export default meta;

export const Dark: Story = {};

export const Light: Story = {
  args: {
    skin: "light",
  },
};
