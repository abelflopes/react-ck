import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Grid, Card, Text, type GridColumnProps, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";
import { sentenceCase } from "change-case";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  ...configureStory(Grid, {
    parameters: {
      layout: "padded",
    },
    subcomponents: { "Grid.Column": Grid.Column },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
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

type Story = StoryObj<typeof meta>;

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
