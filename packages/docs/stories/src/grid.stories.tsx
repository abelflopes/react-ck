import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config/src/index";
import { Grid } from "@react-ck/grid";
import { Card } from "@react-ck/card";

type Story = StoryObj<typeof Grid>;

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  ...configureStory(
    Grid,
    {
      decorators: [
        (Story): React.ReactElement => (
          <Manager>
            <Story />
          </Manager>
        ),
      ],
    },
    {
      subComponents: [Grid.Column],
    },
  ),
};

export default meta;

export const Component: Story = {
  args: {
    children: (
      <>
        <Grid.Column size={2}>
          <Card>{faker.lorem.sentence(2)}</Card>
        </Grid.Column>

        <Grid.Column size={2}>
          <Card>{faker.lorem.sentence(2)}</Card>
        </Grid.Column>

        <Grid.Column size={3}>
          <Card>{faker.lorem.sentence(5)}</Card>
        </Grid.Column>

        <Grid.Column size={5}>
          <Card>{faker.lorem.sentence(10)}</Card>
        </Grid.Column>

        <Grid.Column size={6}>
          <Card>{faker.lorem.sentence(10)}</Card>
        </Grid.Column>

        <Grid.Column size={4}>
          <Card>{faker.lorem.sentence(6)}</Card>
        </Grid.Column>

        <Grid.Column size={2}>
          <Card>{faker.lorem.sentence(2)}</Card>
        </Grid.Column>

        <Grid.Column size={2}>
          <Card>{faker.lorem.sentence(1)}</Card>
        </Grid.Column>

        <Grid.Column size="auto">
          <Card>{faker.lorem.sentence(2)}</Card>
        </Grid.Column>

        <Grid.Column size={2}>
          <Card>{faker.lorem.sentence(1)}</Card>
        </Grid.Column>
      </>
    ),
  },
};
