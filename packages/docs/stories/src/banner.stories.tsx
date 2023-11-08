import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { Banner } from "@rck/banner/src";
import { Text } from "@rck/text/src";
import { Button } from "@rck/button/src";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const WithText: Story = {
  args: {
    src: faker.image.urlPicsumPhotos(),
    children: (
      <>
        <Text type="huge">{faker.lorem.sentence()}</Text>
        <Text>{faker.lorem.sentence()}</Text>
      </>
    ),
  },
};

export const ImageOnly: Story = {
  args: {
    src: faker.image.urlPicsumPhotos(),
  },
};

export const WithActions: Story = {
  args: {
    src: faker.image.urlPicsumPhotos(),
    children: (
      <>
        <Text type="huge">{faker.lorem.sentence()}</Text>
        <Text>{faker.lorem.sentence()}</Text>
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
