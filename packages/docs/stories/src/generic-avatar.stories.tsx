import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Avatar, Manager } from "react-ck";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof Avatar> = {
  title: "Generic/Avatar",
  ...configureStory(Avatar, {
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

export const WithImage: Story = {
  args: {
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
};

export const InitialsOnly: Story = {
  args: {
    name: faker.person.fullName(),
  },
};
