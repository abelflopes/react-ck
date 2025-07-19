import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Badge, Manager } from "react-ck";

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

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    skin: "negative",
    title: "125 pending notifications",
    children: "99",
  },
};
