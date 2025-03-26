import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Breadcrumbs } from "@react-ck/base-components/src";
import { faker } from "@faker-js/faker";
import { Icon } from "@react-ck/icon/src";
import { IconCog } from "@react-ck/icon/icons/IconCog";

type Story = StoryObj<typeof Breadcrumbs>;

const meta: Meta<typeof Breadcrumbs> = {
  title: "Generic/Breadcrumbs",
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
      <Breadcrumbs.Item key="1" as={<a href="/"> {faker.lorem.word()}</a>} />,
      <Breadcrumbs.Item key="2" as={["a", { href: "../" }]}>
        <Icon size="text">
          <IconCog />
        </Icon>
        {faker.lorem.word()}
      </Breadcrumbs.Item>,
      <Breadcrumbs.Item key="3" active>
        {faker.lorem.word()}
      </Breadcrumbs.Item>,
    ],
  },
};
