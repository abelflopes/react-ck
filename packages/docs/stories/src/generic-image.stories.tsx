import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Image } from "@react-ck/provisional/src";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof Image>;

const meta: Meta<typeof Image> = {
  title: "Generic/Image",
  ...configureStory(Image, {
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
    src: faker.image.url(),
  },
};
