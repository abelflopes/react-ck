import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Divider } from "@react-ck/divider/src";

type Story = StoryObj<typeof Divider>;

const meta: Meta<typeof Divider> = {
  title: "Generic/Divider",
  ...configureStory(Divider, {
    decorators: [
      (Story) => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    type: "vertical",
  },
};
