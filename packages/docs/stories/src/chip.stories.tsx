import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Chip } from "@react-ck/chip/src";

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: "Generic/Chip",
  ...configureStory(Chip, {
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
    children: faker.lorem.words({ min: 1, max: 2 }),
  },
};
