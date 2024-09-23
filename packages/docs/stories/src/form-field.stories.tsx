import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { configureStory } from "@react-ck/story-config";
import { FormField } from "@react-ck/form-field/src";
import { Input } from "@react-ck/input/src";
import { generateAllVariations } from "./utils/generate-all-variations";
import { Checkbox } from "@react-ck/provisional/src";

type Story = StoryObj<typeof FormField>;

const meta: Meta<typeof FormField> = {
  title: "Form/Form Field",
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
    children: <Input placeholder="Input" />,
    description: faker.lorem.sentence(),
  },
};

export const Validation: Story = {
  args: {
    skin: "negative",
    label: capitalCase(faker.lorem.word()),
    children: <Input placeholder="Input" />,
    description: faker.lorem.sentence(),
    validationMessage: faker.lorem.sentence(),
  },
};

export const Inline: Story = {
  args: {
    ...Validation.args,
    children: <Checkbox />,
    variation: "inline",
  },
};

export const InlineReverse: Story = {
  args: {
    ...Inline.args,
    variation: "inline-reverse",
  },
};

export const AllVariations: Story = {
  decorators: [
    (): React.ReactElement => (
      <>
        {generateAllVariations(FormField, {
          label: [capitalCase(faker.lorem.word()), undefined],
          skin: ["default", "negative", "average", "positive"],
          description: [undefined, faker.lorem.sentence()],
          validationMessage: [undefined, faker.lorem.sentence()],
          children: [<Input placeholder="Input" />],
        })}

        {generateAllVariations(FormField, {
          label: [capitalCase(faker.lorem.word()), undefined],
          skin: ["default", "negative", "average", "positive"],
          description: [undefined, faker.lorem.sentence()],
          validationMessage: [undefined, faker.lorem.sentence()],
          variation: ["inline", "inline-reverse"],
          children: [<Checkbox />],
        })}
      </>
    ),
  ],
};
