import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Progress } from "@react-ck/progress/src";

type Story = StoryObj<typeof Progress>;

const meta: Meta<typeof Progress> = {
  title: "Loading/Progress",
  ...configureStory(Progress, {
    parameters: {
      layout: "padded",
    },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    value: 50,
  },
};
