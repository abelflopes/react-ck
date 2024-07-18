import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Skeleton } from "@react-ck/skeleton/src";
import { Table } from "@react-ck/table/src";
import { Grid } from "@react-ck/grid/src";

type Story = StoryObj<typeof Skeleton>;

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

export const SkeletonTable: Story = {
  render: (): React.ReactElement => (
    <Table skin="bordered">
      <Table.Thead>
        <Table.Tr>
          <Table.Td>
            <Skeleton variation="text" />
          </Table.Td>
          <Table.Td>
            <Skeleton variation="text" />
          </Table.Td>
          <Table.Td>
            <Skeleton variation="text" />
          </Table.Td>
          <Table.Td>
            <Skeleton variation="text" />
          </Table.Td>
        </Table.Tr>
      </Table.Thead>
      <Table.TBody>
        {[...Array.from(Array(10)).keys()].map((i) => (
          <Table.Tr key={i}>
            <Table.Td>
              <Skeleton variation="text" />
            </Table.Td>
            <Table.Td>
              <Skeleton variation="text" />
            </Table.Td>
            <Table.Td>
              <Skeleton variation="text" />
            </Table.Td>
            <Table.Td>
              <Skeleton variation="text" />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.TBody>
    </Table>
  ),
};
