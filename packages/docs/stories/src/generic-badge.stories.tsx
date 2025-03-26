import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Badge } from "@react-ck/base-components/src";

type Story = StoryObj<typeof Badge>;

const meta: Meta<typeof Badge> = {
  title: "Generic/Badge",
  ...configureStory(Badge, {
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
    skin: "negative",
    title: "125 pending notifications",
    children: "99+",
  },
};
