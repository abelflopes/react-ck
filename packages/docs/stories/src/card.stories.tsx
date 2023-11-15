import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@react-ck/theme";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Card, CardImage } from "@react-ck/card/src";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "Generic/Card",
  ...configureStory(Card, {
    decorators: [
      (Story) => (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      ),
    ],
  }),
};

export default meta;

export const Component: Story = {
  args: {
    children: (
      <>
        <CardImage src={faker.image.urlPicsumPhotos({ width: 320, height: 100 })} />
        <Text type="h2">{faker.lorem.sentence(4)}</Text>
        <Text>{faker.lorem.sentence(6)}</Text>
      </>
    ),
  },
};
