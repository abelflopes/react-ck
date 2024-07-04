import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config";
import { Select, SelectProps } from "@react-ck/select/src";
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

const args: SelectProps = {
  placeholder: "Select a value",
  children: (
    <>
      <Select.Option value="" selected disabled>
        Select Value
      </Select.Option>
      <Select.Option>{faker.lorem.word()}</Select.Option>
      <Select.Option>{faker.lorem.word()}</Select.Option>
      <Select.Option>{faker.lorem.word()}</Select.Option>
    </>
  ),
  onChange: (e) => {
    console.log("change", e.target.value, e.target.selectedOptions);
  },
};

export default meta;

export const Normal: Story = {
  args,
};

export const WithSearch: Story = {
  args: {
    ...args,
    search: {
      placeholder: "Search",
      emptyStateMessage: (value) => (
        <>
          Unable to find results for <b>&quot;{value}&quot;</b>
        </>
      ),
    },
  },
};

export const Validation: Story = {
  args: {
    ...args,
    skin: "negative",
    required: true,
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
    ...args,
    required: true,
  },
};
