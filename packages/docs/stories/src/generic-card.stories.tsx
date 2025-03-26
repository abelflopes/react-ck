import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Text, type CardProps, Card } from "@react-ck/base-components/src";
import { configureStory } from "@react-ck/story-config";
import { generateAllVariations } from "./utils/generate-all-variations";
import { sentenceCase } from "change-case";

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

export const Default: Story = {
  args: {
    children: (
      <>
        <Text skin="bold" margin="none">
          {faker.lorem.sentence(4)}
        </Text>

        <Text margin="none">{faker.lorem.sentence(16)}</Text>
      </>
    ),
  },
};

export const CardImage: Story = {
  args: {
    children: (
      <>
        <Card.Image src={faker.image.urlPicsumPhotos({ width: 320, height: 100 })} />

        <Text skin="bold" margin="none">
          {faker.lorem.sentence(4)}
        </Text>

        <Text margin="none">{faker.lorem.sentence(16)}</Text>
      </>
    ),
  },
};

export const AsLink: Story = {
  args: {
    as: <a href="/" target="__blank" aria-label="Link to somewhere" />,
    interaction: "click",
    children: (
      <>
        <Text skin="bold" margin="none">
          {faker.lorem.sentence(4)}
        </Text>

        <Text margin="none">{faker.lorem.sentence(16)}</Text>
      </>
    ),
  },
};

export const AllCardVariations: Story = {
  decorators: [
    (): React.ReactElement =>
      generateAllVariations<CardProps>(
        Card,
        {
          skin: ["bordered", "shadowed", "ghost"],
          spacing: ["l", "m", "s", "none"],
          interaction: [undefined, "hover", "click"],
          variation: ["vertical", "horizontal"],
          children: [sentenceCase(faker.lorem.words({ min: 1, max: 2 }))],
        },
        {
          align: "start",
        },
      ),
  ],
};
