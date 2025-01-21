import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config/src/index";
import { Flex } from "@react-ck/provisional/src";

type Story = StoryObj<typeof Flex>;

const meta: Meta<typeof Flex> = {
  title: "Layout/Flex",
  ...configureStory(Flex, {
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
  args: {
    align: "center",
    justify: "center",
    direction: "row",
    wrap: "wrap",
    children: (
      <>
        <span>{faker.commerce.product()}</span>
        <span>{faker.commerce.product()}</span>
        <span>{faker.commerce.product()}</span>
      </>
    ),
  },
};
