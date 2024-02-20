import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
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
    variation: "default",
  },
};
