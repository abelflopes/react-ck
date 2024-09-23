import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Avatar } from "@react-ck/provisional/src";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof Avatar>;

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
