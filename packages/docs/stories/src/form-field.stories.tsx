import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { FormField } from "@react-ck/form-field/src";

type Story = StoryObj<typeof FormField>;

const meta: Meta<typeof FormField> = {
  title: "Utility/FormField",
  ...configureStory(FormField, {
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

export const Normal: Story = {
  args: {
    label: capitalCase(faker.lorem.word()),
    children: "Content",
    description: faker.lorem.sentence(),
  },
};

export const Validation: Story = {
  args: {
    skin: "negative",
    label: capitalCase(faker.lorem.word()),
    children: "Content",
    description: faker.lorem.sentence(),
    validationMessage: faker.lorem.sentence(),
  },
};
