import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { generateDescribedCombinations } from "@react-ck/misc-utils";
import { Manager } from "@react-ck/manager";
import { Grid, Skeleton, Menu, Text, type TextProps } from "@react-ck/base-components/src";
import { capitalCase } from "change-case";
import { faker } from "@faker-js/faker";

type Story = StoryObj<unknown>;

const meta: Meta = {
  title: "Test/Skeleton & Text",
  decorators: [
    (Story): React.ReactElement => (
      <Manager>
        <Story />
      </Manager>
    ),
  ],
};

export default meta;

export const TextSkeleton: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => (
    <Grid align="centered">
      {generateDescribedCombinations<TextProps<"p">>({
        variation: ["banner", "h1", "h2", "h3", "h4", "h5", "h6", "p", "small", "extra-small"],
      }).map((i) => (
        <React.Fragment key={i.description}>
          <Grid.Column size={4}>
            <div style={{ outline: "solid 1px green" }}>
              <Text {...i.combination}>{capitalCase(i.combination.variation ?? "-")}</Text>
            </div>
          </Grid.Column>
          <Grid.Column size={4}>
            <div style={{ outline: "solid 1px red" }}>
              <Text {...i.combination}>
                <Skeleton variation="text" />
              </Text>
            </div>
          </Grid.Column>
          <Grid.Column size={4}>
            <div style={{ outline: "solid 1px blue" }}>
              <Text {...i.combination}>
                {capitalCase(i.combination.variation ?? "-")}
                <Skeleton variation="text" />
                {faker.lorem.sentence()}
              </Text>
            </div>
          </Grid.Column>
        </React.Fragment>
      ))}
    </Grid>
  ),
};

export const ListSkeleton: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => (
    <Grid align="centered">
      <Grid.Column size={4}>
        <Menu>
          {Object.keys(Array.from(Array(5))).map((i) => (
            <Menu.Item key={i} style={{ outline: "solid 1px green" }}>
              {faker.lorem.word()}
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
      <Grid.Column size={4}>
        <Menu>
          {Object.keys(Array.from(Array(5))).map((i) => (
            <Menu.Item key={i} style={{ outline: "solid 1px red" }}>
              <Skeleton variation="text" />
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
      <Grid.Column size={4}>
        <Menu>
          {Object.keys(Array.from(Array(5))).map((i) => (
            <Menu.Item key={i} style={{ outline: "solid 1px blue" }}>
              {faker.lorem.word()}
              &nbsp;
              <Skeleton variation="text" />
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
    </Grid>
  ),
};
