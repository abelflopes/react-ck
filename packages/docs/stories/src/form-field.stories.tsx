import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { capitalCase } from "change-case";
import { configureStory } from "@react-ck/storybook-utils";
import { FormField, Input, Checkbox, Select, Manager } from "react-ck";
import { generateAllVariations } from "./utils/generate-all-variations";

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

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    label: capitalCase(faker.lorem.word()),
    variation: "inline-content",
    skin: "positive",
    children: (
      <>
        <Input placeholder={faker.lorem.word()} />
        <Select placeholder={faker.company.buzzVerb()}>
          <Select.Option>{faker.company.buzzAdjective()}</Select.Option>
          <Select.Option>{faker.company.buzzNoun()}</Select.Option>
          <Select.Option>{faker.company.buzzVerb()}</Select.Option>
        </Select>
      </>
    ),
    description: faker.lorem.sentence(),
    validationMessage: faker.lorem.sentence(),
  },
};

export const Basic: Story = {
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

export const Disabled: Story = {
  args: {
    ...Demo.args,
    disabled: true,
  },
};

export const AllVariations: Story = {
  decorators: [
    (): React.ReactElement => (
      <>
        {generateAllVariations(FormField, {
          label: [capitalCase(faker.lorem.word()), undefined],
          skin: ["default", "negative", "average", "positive", "muted"],
          description: [undefined, faker.lorem.sentence()],
          validationMessage: [undefined, faker.lorem.sentence()],
          children: [<Input placeholder="Input" />],
        })}

        {generateAllVariations(FormField, {
          label: [capitalCase(faker.lorem.word()), undefined],
          skin: ["default", "negative", "average", "positive", "muted"],
          description: [undefined, faker.lorem.sentence()],
          validationMessage: [undefined, faker.lorem.sentence()],
          variation: ["inline", "inline-reverse"],
          children: [<Checkbox />],
        })}
      </>
    ),
  ],
};
