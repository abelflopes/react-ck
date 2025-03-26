import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Select, type SelectProps, FormField, Chip } from "@react-ck/base-components/src";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  ...configureStory(Select, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager usePortal={false}>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const args: SelectProps = {
  placeholder: "Select a fruit",
  children: (
    <>
      <Select.Option value="Apple" disabled />
      <Select.Option>Guaraná</Select.Option>
      <Select.Option value="bnn">Banana</Select.Option>
      <Select.Option value="orange">Orange</Select.Option>
      <Select.Option
        value="lemon"
        displayValue={
          <>
            LEMON! <Chip>Favorite</Chip>
          </>
        }>
        Lemon 🍋 <Chip skin="primary">Popular</Chip> <Chip>Favorite</Chip>
      </Select.Option>
      <Select.Option value="mango">
        <span>
          <b>Exotic</b> mango
        </span>
      </Select.Option>
    </>
  ),
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

export const Multiple: Story = {
  args: {
    ...WithSearch.args,
    value: ["dog", "zebra"],
    multiple: true,
  },
};

export const Validation: Story = {
  args: {
    ...args,
    skin: "negative",
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
  args,
};

export const Disabled: Story = {
  args: {
    ...args,
    disabled: true,
  },
};
