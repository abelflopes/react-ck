import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Text, Tabs, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof Tabs> = {
  title: "Generic/Tabs",
  ...configureStory(Tabs, {
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
  parameters: {
    layout: "padded",
  },
  args: {
    items: [
      {
        id: "1",
        heading: faker.lorem.word(),
        content: <Text margin="none">{faker.lorem.sentence(50)}</Text>,
      },
      {
        id: "2",
        heading: faker.lorem.word(),
        content: <Text margin="none">{faker.lorem.sentence(100)}</Text>,
      },
    ],
  },
};

export const Chip: Story = {
  ...Component,
  args: {
    ...Component.args,
    skin: "chip",
  },
};
