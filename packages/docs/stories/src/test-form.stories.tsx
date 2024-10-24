import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager/src";
import { FormField } from "@react-ck/form-field/src";
import { Grid } from "@react-ck/grid/src";
import { Input } from "@react-ck/input/src";
import { Button } from "@react-ck/button/src";
import { Select } from "@react-ck/select/src";
import { Checkbox, Radio } from "@react-ck/provisional/src";

type Story = StoryObj<unknown>;

const meta: Meta = {
  title: "Test/Form",
  decorators: [
    (Story): React.ReactElement => (
      <Manager>
        <Story />
      </Manager>
    ),
  ],
};

export default meta;

export const demo: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => (
    <form>
      <Grid align="centered" spacing="l">
        <Grid.Column size={4}>
          <FormField>
            <Input type="text" placeholder="Username" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <Input type="password" placeholder="Password" />
        </Grid.Column>
        <Grid.Column size={4}>
          <Select placeholder="Allow deselect" required>
            <Select.Option>A</Select.Option>
            <Select.Option>B</Select.Option>
            <Select.Option>C</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column size={4}>
          <Select placeholder="Disallow deselect" allowDeselect={false}>
            <Select.Option>X</Select.Option>
            <Select.Option>Y</Select.Option>
            <Select.Option>Z</Select.Option>
          </Select>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Name" description="Insert your full name">
            <Input type="text" placeholder="Full legal name" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Email" description="Insert your company email">
            <Input type="email" placeholder="Search" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Retired" description="Are you +65 and retired?" variation="inline">
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Would you like to make a donation?" variation="inline-reverse">
            <Checkbox />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="What are you?">
            <FormField label="Male" variation="inline">
              <Radio name="gender" />
            </FormField>
            <FormField label="Female" variation="inline">
              <Radio name="gender" />
            </FormField>
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Lifestyle" variation="inline-reverse">
            <FormField label="Active" variation="inline">
              <Radio name="lifestyle" />
            </FormField>
            <FormField label="Sedentary" variation="inline">
              <Radio name="lifestyle" />
            </FormField>
          </FormField>
        </Grid.Column>
        <Grid.Column size={12} />
        <Grid.Column size={4}>
          <FormField label="Product">
            <Input type="text" value="BTC" />
            -
            <Input type="text" value="USD" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Date">
            <Input type="date" />
            <Input type="time" />
            <Input type="month" />
            <Input type="week" />
          </FormField>
        </Grid.Column>
        <Grid.Column size={12} />
        <Grid.Column size={4}>
          <FormField label="Duration">
            <Input type="number" value="1" />-
            <Select placeholder="Period" allowDeselect={false}>
              <Select.Option>days</Select.Option>
              <Select.Option>weeks</Select.Option>
              <Select.Option>months</Select.Option>
              <Select.Option>years</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Duration" variation="inline">
            <Input type="number" value="1" />-
            <Select placeholder="Period" allowDeselect={false}>
              <Select.Option>days</Select.Option>
              <Select.Option>weeks</Select.Option>
              <Select.Option>months</Select.Option>
              <Select.Option>years</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={4}>
          <FormField label="Duration" variation="inline-reverse">
            <Input type="number" value="1" />-
            <Select placeholder="Period" allowDeselect={false}>
              <Select.Option>days</Select.Option>
              <Select.Option>weeks</Select.Option>
              <Select.Option>months</Select.Option>
              <Select.Option>years</Select.Option>
            </Select>
          </FormField>
        </Grid.Column>
        <Grid.Column size={12} />
        <Grid.Column>
          <Button as="a" skin="ghost">
            Contact support
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button type="reset" skin="secondary">
            Reset
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button>Submit</Button>
        </Grid.Column>
      </Grid>
    </form>
  ),
};
