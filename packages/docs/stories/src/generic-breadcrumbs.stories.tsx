import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Breadcrumbs, Manager, Icon } from "react-ck";
import { faker } from "@faker-js/faker";
import { IconCog } from "@react-ck/icon/icons/IconCog";

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

type Story = StoryObj<typeof meta>;

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
