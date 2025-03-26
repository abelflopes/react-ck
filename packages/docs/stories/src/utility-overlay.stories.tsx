import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Overlay } from "@react-ck/base-components/src";

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
      (Story): React.ReactElement => (
        <Manager>
          <div style={{ padding: "30px" }}>
            <div style={{ position: "relative", height: "90px" }}>
              <Story />
            </div>
          </div>
        </Manager>
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
