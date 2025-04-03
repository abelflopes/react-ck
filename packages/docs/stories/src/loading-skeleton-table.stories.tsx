import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { SkeletonTable } from "@react-ck/base-components/src/skeleton";

type Story = StoryObj<typeof SkeletonTable>;

const meta: Meta<typeof SkeletonTable> = {
  title: "Loading/SkeletonTable",
  ...configureStory(SkeletonTable, {
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
  args: {},
};

export const Small: Story = {
  args: {
    rowCount: 2,
    columnCount: 3,
  },
};

export const Large: Story = {
  args: {
    rowCount: 5,
    columnCount: 6,
  },
};
