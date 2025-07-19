import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { Text, Button, Banner, Manager, Icon } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";
import { IconLinkedin } from "@react-ck/icon/icons/IconLinkedin";

const meta: Meta<typeof Banner> = {
  title: "Layout/Banner",
  ...configureStory(Banner, {
    parameters: {
      layout: "fullscreen",
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
    src: faker.image.urlPicsumPhotos(),
    children: (
      <>
        <Text variation="banner">{faker.lorem.sentence()}</Text>

        <Text>{faker.lorem.sentence()}</Text>

        <Icon>
          <IconLinkedin />
        </Icon>
      </>
    ),
    actions: [
      <Button key="1">{capitalCase(faker.lorem.word())}</Button>,
      <Button key="2" skin="secondary">
        {capitalCase(faker.lorem.words({ min: 1, max: 2 }))}
      </Button>,
    ],
  },
};
