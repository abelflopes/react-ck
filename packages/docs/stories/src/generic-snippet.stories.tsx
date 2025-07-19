import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/storybook-utils";
import { Snippet, Button, Manager } from "react-ck";
import { IconTrash } from "@react-ck/icon/icons/All";

const meta: Meta<typeof Snippet> = {
  title: "Generic/Snippet",
  ...configureStory(Snippet, {
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

type Story = StoryObj<typeof meta>;

const sampleCode = JSON.stringify(
  {
    name: faker.person.firstName(),
    sex: faker.person.sex(),
    job: faker.person.jobTitle(),
  },
  null,
  2,
);

export const Default: Story = {
  args: {
    children: sampleCode,
  },
};

export const WithoutCopyButton: Story = {
  args: {
    children: sampleCode,
    showCopyButton: false,
  },
};

export const WithCustomActions: Story = {
  args: {
    children: sampleCode,
    actions: <Button aria-label="Delete snippet" size="s" skin="negative" icon={<IconTrash />} />,
  },
};

export const WithCustomActionsAndCopyButton: Story = {
  args: {
    children: sampleCode,
    actions: <Button aria-label="Delete snippet" size="s" skin="negative" icon={<IconTrash />} />,
    showCopyButton: true,
  },
};

export const Inline: Story = {
  args: {
    children: faker.lorem.word(),
    actions: <Button aria-label="Delete snippet" size="s" skin="negative" icon={<IconTrash />} />,
    showCopyButton: true,
    variation: "inline",
  },
};
