import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { SkeletonTable, Manager } from "react-ck";

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

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    rows: 2,
    columns: 3,
  },
};

export const Large: Story = {
  args: {
    rows: 5,
    columns: 6,
  },
};
