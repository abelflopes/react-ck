import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config/src/index";
import { Grid } from "@react-ck/grid/src";
import { Card } from "@react-ck/card/src";
import { type GridColumnProps } from "@react-ck/grid/src/Column";

type Story = StoryObj<typeof Grid>;

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  ...configureStory(
    Grid,
    {
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
    },
    {
      subComponents: [Grid.Column],
    },
  ),
};

const sizes: Array<GridColumnProps["size"]> = [12, 6, 4, 2, 2, "auto", 3];

export default meta;

export const Component: Story = {
  args: {
    children: (
      <>
        {sizes.map((i) => (
          <Grid.Column key={i} size={i}>
            <Card>
              {faker.lorem.sentence(2)} ({i})
            </Card>
          </Grid.Column>
        ))}
      </>
    ),
  },
};
