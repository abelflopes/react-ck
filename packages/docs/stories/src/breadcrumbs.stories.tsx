import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Breadcrumbs } from "@react-ck/provisional/src";
import { faker } from "@faker-js/faker";

type Story = StoryObj<typeof Breadcrumbs>;

const meta: Meta<typeof Breadcrumbs> = {
  title: "Layout/Breadcrumbs",
  ...configureStory(Breadcrumbs, {
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
    items: [
      <Breadcrumbs.Item key="1">{faker.lorem.word()}</Breadcrumbs.Item>,
      <Breadcrumbs.Item key="2">{faker.lorem.word()}</Breadcrumbs.Item>,
      <Breadcrumbs.Item key="3" active>
        {faker.lorem.word()}
      </Breadcrumbs.Item>,
    ],
  },
};
