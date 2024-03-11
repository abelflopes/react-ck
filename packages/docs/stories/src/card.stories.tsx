import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text } from "@react-ck/text/src";
import { configureStory } from "@react-ck/story-config";
import { Card } from "@react-ck/card";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "Generic/Card",
  ...configureStory(
    Card,
    {
      decorators: [
        (Story): React.ReactElement => (
          <Manager>
            <Story />
          </Manager>
        ),
      ],
    },
    {
      subComponents: [Card.Image],
    },
  ),
};

export default meta;

export const Component: Story = {
  args: {
    children: (
      <>
        <Card.Image src={faker.image.urlPicsumPhotos({ width: 320, height: 100 })} />

        <Text variation="h2">{faker.lorem.sentence(4)}</Text>

        <Text>{faker.lorem.sentence(6)}</Text>
      </>
    ),
  },
};
