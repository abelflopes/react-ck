import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { generateDescribedCombinations } from "@react-ck/misc-utils";
import { Manager } from "@react-ck/manager";
import { Grid } from "@react-ck/grid/src";
import { Skeleton } from "@react-ck/skeleton/src";
import { Text, type TextProps } from "@react-ck/text/src";
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

export const demo: Story = {
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