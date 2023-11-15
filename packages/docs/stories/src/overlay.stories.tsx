import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { configureStory } from "@react-ck/story-config";
import { Overlay } from "@react-ck/overlay/src";

type Story = StoryObj<typeof Overlay>;

const meta: Meta<typeof Overlay> = {
  title: "Utility/Overlay",
  ...configureStory(Overlay, {
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
  }),
};

export default meta;

export const Dark: Story = {};

export const Light: Story = {
  args: {
    skin: "light",
  },
};
