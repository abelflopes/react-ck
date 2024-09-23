import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { configureStory } from "@react-ck/story-config/src/index";
import { Grid } from "@react-ck/grid/src";
import { Card } from "@react-ck/card/src";
import { type GridColumnProps } from "@react-ck/grid/src/Column";
import { Text } from "@react-ck/text/src";
import { sentenceCase } from "change-case";

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

const cols: GridColumnProps[] = [
  { size: 12 },
  {
    size: 12,
    responsive: {
      xl: { size: 6 },
    },
  },
  {
    size: 12,
    responsive: {
      xl: { size: 6 },
      xxl: { size: 4 },
    },
  },
  {
    size: 12,
    responsive: {
      xl: { size: 6 },
      xxl: { size: 2 },
    },
  },
  {
    size: 12,
    responsive: {
      xl: { size: 6 },
      xxl: { size: 2 },
    },
  },
  { size: "auto" },
  {
    size: 12,
    responsive: {
      l: { size: 3 },
    },
  },
  {
    size: 12,
    responsive: {
      l: { size: 5 },
    },
  },
];

export default meta;

export const Component: Story = {
  args: {
    align: "stretch",
    children: (
      <>
        {cols.map((i, k) => (
          <Grid.Column key={JSON.stringify({ ...i, k })} {...i}>
            {/* height 100% for stretch mode */}
            <Card style={{ height: "100%" }}>
              <Text margin="none">
                {faker.lorem.sentence(2)}
                <br />({sentenceCase(JSON.stringify(i))})
              </Text>
            </Card>
          </Grid.Column>
        ))}
      </>
    ),
  },
};
