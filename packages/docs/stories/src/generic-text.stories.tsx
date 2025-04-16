import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Card, Text, type TextProps } from "@react-ck/base-components/src";
import { generateAllVariations } from "./utils/generate-all-variations";
import { sentenceCase } from "change-case";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Generic/Text",
  ...configureStory(Text, {
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
    children: faker.lorem.sentence(),
  },
};

export const Inverted: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    skin: "inverted",
    children: faker.lorem.sentence(),
  },
};

export const Link: Story = {
  args: {
    skin: "link",
    as: <a href="#some-link">{faker.lorem.sentence()}</a>,
  },
};

export const AllTextVariations: Story = {
  decorators: [
    (): React.ReactElement => (
      <>
        <Text variation="h2">Skins</Text>

        <Card>
          {generateAllVariations<TextProps<"span">>(Text, {
            as: ["span"],
            skin: [
              "default",
              "bold",
              "link",
              "link_hidden",
              "link_underline",
              "inverted",
              "soft",
              "highlight-primary",
              "negative",
              "average",
              "positive",
              "info",
            ],
            variation: ["p"],
            children: [sentenceCase(faker.lorem.words({ min: 1, max: 2 }))],
          })}
        </Card>

        <Text variation="h2">Variations</Text>

        <Card>
          {generateAllVariations<TextProps<"span">>(Text, {
            as: ["span"],
            skin: ["default"],
            variation: ["banner", "h1", "h2", "h3", "h4", "h5", "h6", "p", "small", "extra-small"],
            margin: ["none"],
            children: [sentenceCase(faker.lorem.words({ min: 1, max: 2 }))],
          })}
        </Card>
      </>
    ),
  ],
};
