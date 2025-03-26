import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text, List } from "@react-ck/base-components/src";
import { configureStory } from "@react-ck/story-config";

type Story = StoryObj<typeof List>;

const meta: Meta<typeof List> = {
  title: "Generic/List",
  ...configureStory(List, {
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
  parameters: {
    controls: { exclude: ["items"] },
  },
  args: {
    skin: "bordered",
    items: [
      <Text key="0">{faker.lorem.word()}</Text>,
      <Text key="1">{faker.lorem.words({ min: 2, max: 4 })}</Text>,
      <Text key="2">{faker.lorem.word()}</Text>,
    ],
  },
};
