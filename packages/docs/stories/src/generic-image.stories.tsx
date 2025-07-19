import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Image, Manager } from "react-ck";
import { faker } from "@faker-js/faker";

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

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    src: faker.image.url(),
  },
};
