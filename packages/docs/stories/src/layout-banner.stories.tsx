import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { Text, Button, Banner } from "@react-ck/base-components/src";
import { configureStory } from "@react-ck/story-config";
import { Icon } from "@react-ck/icon/src";
import { IconLinkedin } from "@react-ck/icon/icons/IconLinkedin";

type Story = StoryObj<typeof Banner>;

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
