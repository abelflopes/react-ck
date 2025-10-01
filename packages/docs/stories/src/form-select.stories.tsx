import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Select, type SelectProps, FormField, Chip, Manager } from "react-ck";

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

type Story = StoryObj<typeof meta>;

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
      <FormField label="Your preference" description="Insert your preferred value">
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

export const FullWidth: Story = {
  args: {
    ...args,
    fullWidth: true,
  },
};

export const Loading: Story = {
  args: {
    ...args,
    loading: true,
    fullWidth: true,
  },
};

export const WithGroups: Story = {
  args: {
    placeholder: "Select a food item",
    children: (
      <>
        <Select.Group name="Fruits">
          <Select.Option value="apple">Apple</Select.Option>
          <Select.Option value="banana">Banana</Select.Option>
          <Select.Option value="orange">Orange</Select.Option>
          <Select.Option value="grape">Grape</Select.Option>
        </Select.Group>
        <Select.Group name="Vegetables">
          <Select.Option value="carrot">Carrot</Select.Option>
          <Select.Option value="broccoli">Broccoli</Select.Option>
          <Select.Option value="spinach">Spinach</Select.Option>
          <Select.Option value="tomato">Tomato</Select.Option>
        </Select.Group>
        <Select.Group name="Dairy">
          <Select.Option value="milk">Milk</Select.Option>
          <Select.Option value="cheese">Cheese</Select.Option>
          <Select.Option value="yogurt">Yogurt</Select.Option>
        </Select.Group>
      </>
    ),
  },
};

export const WithGroupsAndSearch: Story = {
  args: {
    ...WithGroups.args,
    search: {
      placeholder: "Search food items",
      emptyStateMessage: (value) => (
        <>
          No food items found for <b>&quot;{value}&quot;</b>
        </>
      ),
    },
  },
};

export const WithGroupsMultiple: Story = {
  args: {
    ...WithGroupsAndSearch.args,
    multiple: true,
    placeholder: "Select multiple food items",
  },
};
