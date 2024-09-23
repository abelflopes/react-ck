import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { EmptyState } from "@react-ck/empty-state/src";
import { Button } from "@react-ck/button/src";

type Story = StoryObj<typeof EmptyState>;

const meta: Meta<typeof EmptyState> = {
  title: "Generic/EmptyState",
  ...configureStory(EmptyState, {
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

export const Default: Story = {
  args: {
    children: "No data to display",
  },
};

export const WithAction: Story = {
  args: {
    ...Default.args,
    after: <Button>Reload</Button>,
  },
};
