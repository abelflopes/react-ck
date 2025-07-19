import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { EmptyState, Button, Manager } from "react-ck";

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

type Story = StoryObj<typeof meta>;

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
