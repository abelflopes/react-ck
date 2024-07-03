import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Select } from "@react-ck/select/src";
import { FormField } from "@react-ck/form-field/src";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  ...configureStory(Select, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const children = (
  <>
    <Select.Option value="" selected disabled>
      Select Value
    </Select.Option>

    <Select.Option>{faker.lorem.word()}</Select.Option>

    <Select.Option>{faker.lorem.word()}</Select.Option>

    <Select.Option>{faker.lorem.word()}</Select.Option>
  </>
);

export default meta;

export const Normal: Story = {
  args: {
    children,
  },
};

export const Validation: Story = {
  args: {
    skin: "negative",
    required: true,
    children,
  },
};

export const WithFormField: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <FormField
        skin="negative"
        label="Your preference"
        description="Insert your preferred value"
        validationMessage="Required field">
        <Story />
      </FormField>
    ),
  ],
  args: {
    required: true,
    children,
  },
};
