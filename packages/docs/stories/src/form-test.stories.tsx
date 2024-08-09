import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { FormField } from "@react-ck/form-field/src";
import { Grid } from "@react-ck/grid/src";
import { Input } from "@react-ck/input/src";
import { Button } from "@react-ck/button/src";

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
    <>
      <Grid align="centered">
        <Grid.Column>
          <FormField>
            <Input type="text" placeholder="Name" />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <Input type="search" placeholder="Search" />
        </Grid.Column>
        <Grid.Column>
          <Button>Submit</Button>
        </Grid.Column>
        <Grid.Column>
          <Button as="a" skin="secondary">
            Contact support
          </Button>
        </Grid.Column>
      </Grid>

      <Grid align="centered">
        <Grid.Column>
          <FormField label="Your email" description="Insert your company email">
            <Input type="search" placeholder="Search" />
          </FormField>
        </Grid.Column>
        <Grid.Column>
          <Button>Submit</Button>
        </Grid.Column>
      </Grid>
    </>
  ),
};
