import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Badge } from "@react-ck/badge/src";

type Story = StoryObj<typeof Badge>;

const meta: Meta<typeof Badge> = {
  title: "Generic/Badge",
  ...configureStory(Badge, {
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

export const Component: Story = {
  args: {
    skin: "negative",
    title: "125 pending notifications",
    children: "99+",
  },
};
