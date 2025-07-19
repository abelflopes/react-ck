import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Overlay, Manager } from "react-ck";

const meta: Meta<typeof Overlay> = {
  title: "Utility/Overlay",
  ...configureStory(Overlay, {
    globals: {
      backgrounds: { value: "medium" },
    },
    parameters: {
      layout: "fullscreen",
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

type Story = StoryObj<typeof meta>;

export const Dark: Story = {};

export const Light: Story = {
  args: {
    skin: "light",
  },
};
