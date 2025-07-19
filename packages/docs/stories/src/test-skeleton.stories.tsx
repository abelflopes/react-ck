import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { generateDescribedCombinations } from "@react-ck/misc-utils";
import { Grid, Skeleton, Menu, Text, type TextProps, Manager, Icon } from "react-ck";
import { capitalCase } from "change-case";
import { faker } from "@faker-js/faker";
import { IconAttach } from "@react-ck/icon/icons/IconAttach";

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

type Story = StoryObj<typeof meta>;

export const TextSkeleton: Story = {
  parameters: {
    layout: "padded",
  },
  render: (): React.ReactElement => (
    <>
      {generateDescribedCombinations<TextProps<"p">>({
        variation: ["banner", "h1", "h2", "h3", "h4", "h5", "h6", "p", "small", "extra-small"],
      }).map((i) => (
        <Grid key={i.description} align="centered">
          <Grid.Column size={2}>
            <div style={{ outline: "solid 1px green" }}>
              <Text {...i.combination}>{capitalCase(i.combination.variation ?? "-")}</Text>
            </div>
          </Grid.Column>
          <Grid.Column size={1}>
            <div style={{ outline: "solid 1px red" }}>
              <Text {...i.combination}>
                <Skeleton variation="text" />
              </Text>
            </div>
          </Grid.Column>
          <Grid.Column size={1}>
            <div style={{ outline: "solid 1px orange" }}>
              <Text {...i.combination}>
                <Icon size="text">
                  <IconAttach />
                </Icon>
              </Text>
            </div>
          </Grid.Column>
          <Grid.Column size={8}>
            <div style={{ outline: "solid 1px blue" }}>
              <Text {...i.combination}>
                {capitalCase(i.combination.variation ?? "-")}
                &nbsp;
                <Skeleton variation="text" style={{ maxWidth: 100 }} />
                &nbsp;
                {faker.lorem.sentence(2)}
                &nbsp;
                <Icon size="text">
                  <IconAttach />
                </Icon>
                &nbsp;
                {faker.lorem.sentence(2)}
              </Text>
            </div>
          </Grid.Column>
        </Grid>
      ))}
    </>
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
          {Object.keys([...Array(5)]).map((i) => (
            <Menu.Item key={i} style={{ outline: "solid 1px green" }}>
              {faker.lorem.word()}
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
      <Grid.Column size={4}>
        <Menu>
          {Object.keys([...Array(5)]).map((i) => (
            <Menu.Item key={i} style={{ outline: "solid 1px red" }}>
              <Skeleton variation="text" />
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>
      <Grid.Column size={4}>
        <Menu>
          {Object.keys([...Array(5)]).map((i) => (
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
