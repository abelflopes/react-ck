import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Pagination } from "@react-ck/base-components/src";

type Story = StoryObj<typeof Pagination>;

const meta: Meta<typeof Pagination> = {
  title: "Generic/Pagination",
  ...configureStory(Pagination, {
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
    total: 20,
  },
};
