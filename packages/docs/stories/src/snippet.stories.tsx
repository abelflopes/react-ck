import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Snippet } from "@react-ck/provisional/src";

type Story = StoryObj<typeof Snippet>;

const meta: Meta<typeof Snippet> = {
  title: "Generic/Snippet",
  ...configureStory(Snippet, {
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
    children: JSON.stringify(
      {
        name: faker.person.firstName(),
        sex: faker.person.sex(),
        job: faker.person.jobTitle(),
      },
      null,
      2,
    ),
  },
};
