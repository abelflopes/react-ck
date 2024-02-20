import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Spinner } from "@react-ck/spinner/src";

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: "Loading/Spinner",
  ...configureStory(Spinner, {
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
  args: {},
};
