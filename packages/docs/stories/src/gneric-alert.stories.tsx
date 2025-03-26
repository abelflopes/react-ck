import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Alert, type AlertProps, Text } from "@react-ck/base-components/src";
import { generateAllVariations } from "./utils/generate-all-variations";
import { sentenceCase } from "change-case";

type Story = StoryObj<typeof Alert>;

const meta: Meta<typeof Alert> = {
  title: "Generic/Alert",
  ...configureStory(Alert, {
    parameters: {
      layout: "padded",
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

export const Basic: Story = {
  args: {
    children: faker.lorem.sentence({ min: 4, max: 10 }),
  },
};

export const WithTitle: Story = {
  args: {
    ...Basic.args,
    heading: faker.lorem.sentence({ min: 2, max: 5 }),
  },
};

export const Dismissable: Story = {
  args: {
    ...WithTitle.args,
    onDismiss: () => undefined,
  },
};

export const compact: Story = {
  args: {
    ...Dismissable.args,
    variation: "compact",
    size: "s",
  },
};

export const AllAlertVariations: Story = {
  decorators: [
    (): React.ReactElement =>
      generateAllVariations<AlertProps>(Alert, {
        skin: ["neutral", "primary", "negative", "average", "positive", "info"],
        variation: ["default", "compact"],
        size: ["l", "m", "s"],
        children: [sentenceCase(faker.lorem.words({ min: 1, max: 2 }))],
        heading: [sentenceCase(faker.lorem.words({ min: 1, max: 2 })), undefined],
        onDismiss: [undefined, (): void => undefined],
        renderDismissAcion: [
          undefined,
          ({ onDismiss }): React.ReactNode => (
            <Text as="button" skin="highlight-primary" onClick={onDismiss}>
              Close
            </Text>
          ),
        ],
      }),
  ],
};
