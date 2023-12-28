import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { EmptyState } from "@react-ck/empty-state/src";

type Story = StoryObj<typeof EmptyState>;

const meta: Meta<typeof EmptyState> = {
  title: "Generic/EmptyState",
  ...configureStory(EmptyState, {
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
    children: <>{faker.lorem.sentence(6)}</>,
  },
};
