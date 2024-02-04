import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Pagination } from "@react-ck/pagination/src";

type Story = StoryObj<typeof Pagination>;

const meta: Meta<typeof Pagination> = {
  title: "Generic/Pagination",
  ...configureStory(Pagination, {
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
    total: 20,
  },
};
