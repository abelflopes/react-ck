import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Skeleton, Grid, Manager } from "react-ck";

const meta: Meta<typeof Skeleton> = {
  title: "Loading/Skeleton",
  ...configureStory(Skeleton, {
    parameters: {
      layout: "padded",
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

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    variation: "default",
  },
};

export const Composition: Story = {
  render: (): React.ReactElement => (
    <Grid>
      <Grid.Column size={12}>
        <Skeleton />
      </Grid.Column>
      <Grid.Column size={12}>
        <Skeleton variation="text" />
      </Grid.Column>
      <Grid.Column size={12}>
        <Skeleton variation="text" />
      </Grid.Column>
      <Grid.Column size={12}>
        <Skeleton variation="text" />
      </Grid.Column>
      <Grid.Column size={12}>
        <Skeleton variation="text" />
      </Grid.Column>
    </Grid>
  ),
};
