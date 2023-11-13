import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { Text } from "@react-ck/text/src";
import { Button } from "@react-ck/button/src";
import { configureStory } from "@react-ck/story-config";
import readme from "@react-ck/banner/README.md";
import { Banner } from "@react-ck/banner/src";

type Story = StoryObj<typeof Banner>;

const meta: Meta<typeof Banner> = {
  title: "Layout/Banner",
  ...configureStory(
    Banner,
    {
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
    },
    {
      readme,
    },
  ),
};

export default meta;

export const Component: Story = {
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
