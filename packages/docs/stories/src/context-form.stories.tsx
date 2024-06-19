import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { ContextForm } from "@react-ck/context-form/src";
import { Button } from "@react-ck/button/src";
import { Grid } from "@react-ck/grid/src";

type Story = StoryObj<typeof ContextForm>;

const meta: Meta<typeof ContextForm> = {
  title: "Form/ContextForm",
  ...configureStory(ContextForm, {
    parameters: {
      layout: "padded",
      source: {
        type: "code",
      },
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

export const Component: Story = {
  args: {
    onValuesChange: (values) => {
      console.log("onValuesChange", values);
    },
    onSubmit: ({ values, e }) => {
      e.preventDefault();
      console.log("onSubmit", values, e);
    },
    children: (
      <Grid>
        <Grid.Column size={12}>
          <ContextForm.Input
            name="username"
            label="Username"
            placeholder="JohnDoe"
            description="Add a respectful alias name"
          />
        </Grid.Column>
        <Grid.Column size={12}>
          <ContextForm.Input
            name="email"
            type="email"
            label="Email"
            placeholder="john-doe@company.com"
            defaultValue="aaaaaa.s"
            description="Add your email address"
            skin="negative"
            validationMessage="Invalid email"
          />
        </Grid.Column>
        <Grid.Column size={12}>
          <ContextForm.Textarea
            name="address"
            label="Address"
            placeholder="St John's st. 12"
            description="Add your residential address"
          />
        </Grid.Column>
        <Grid.Column size={6}>
          <Button type="submit">Submit</Button>
        </Grid.Column>
      </Grid>
    ),
  },
};
