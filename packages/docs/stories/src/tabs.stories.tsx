import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Tabs } from "@react-ck/tabs/src";

type Story = StoryObj<typeof Tabs>;

const meta: Meta<typeof Tabs> = {
  title: "Generic/Tabs",
  ...configureStory(Tabs, {
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
  parameters: {
    layout: "padded",
  },
  args: {
    items: [
      {
        heading: faker.lorem.word(),
        content: <Text>{faker.lorem.sentence(50)}</Text>,
      },
      {
        heading: faker.lorem.word(),
        content: <Text>{faker.lorem.sentence(100)}</Text>,
      },
    ],
  },
};
