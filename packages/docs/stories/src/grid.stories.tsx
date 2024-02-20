import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config/src/index";
import { GridContainer, GridColumn } from "@react-ck/grid/src";
import { Card } from "@react-ck/card";

type Story = StoryObj<typeof GridContainer>;

const meta: Meta<typeof GridContainer> = {
  title: "Layout/Grid",
  ...configureStory(
    GridContainer,
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
      subComponents: [GridColumn],
    },
  ),
};

export default meta;

export const Component: Story = {
  args: {
    children: (
      <>
        <GridColumn size={2}>
          <Card>{faker.lorem.sentence(2)}</Card>
        </GridColumn>

        <GridColumn size={2}>
          <Card>{faker.lorem.sentence(2)}</Card>
        </GridColumn>

        <GridColumn size={3}>
          <Card>{faker.lorem.sentence(5)}</Card>
        </GridColumn>

        <GridColumn size={5}>
          <Card>{faker.lorem.sentence(10)}</Card>
        </GridColumn>

        <GridColumn size={6}>
          <Card>{faker.lorem.sentence(10)}</Card>
        </GridColumn>

        <GridColumn size={4}>
          <Card>{faker.lorem.sentence(6)}</Card>
        </GridColumn>

        <GridColumn size={2}>
          <Card>{faker.lorem.sentence(2)}</Card>
        </GridColumn>

        <GridColumn size={2}>
          <Card>{faker.lorem.sentence(1)}</Card>
        </GridColumn>

        <GridColumn size="auto">
          <Card>{faker.lorem.sentence(2)}</Card>
        </GridColumn>

        <GridColumn size={2}>
          <Card>{faker.lorem.sentence(1)}</Card>
        </GridColumn>
      </>
    ),
  },
};
