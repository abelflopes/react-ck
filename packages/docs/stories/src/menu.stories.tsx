import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Menu } from "@react-ck/provisional/src";
import { Icon } from "@react-ck/icon/src";
import { faker } from "@faker-js/faker";
import { IconUserCircle } from "@react-ck/icon/icons/IconUserCircle";

type Story = StoryObj<typeof Menu>;

const meta: Meta<typeof Menu> = {
  title: "Generic/Menu",
  ...configureStory(
    Menu,
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
      subComponents: [Menu.Item, Menu.Divider],
    },
  ),
};

const children = (
  <>
    <Menu.Item
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }
      skin="primary">
      {faker.person.firstName()}
    </Menu.Item>
    <Menu.Item
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }>
      {faker.person.firstName()}
    </Menu.Item>
    <Menu.Item
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }
      skin="secondary">
      {faker.person.firstName()}
    </Menu.Item>
    <Menu.Item
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }>
      {faker.person.firstName()}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>{faker.animal.type()}</Menu.Item>
    <Menu.Item skin="disabled">{faker.animal.type()}</Menu.Item>
    <Menu.Item>{faker.animal.type()}</Menu.Item>
    <Menu.Divider>Companies</Menu.Divider>
    <Menu.Item>{faker.company.name()}</Menu.Item>
    <Menu.Item
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }>
      {faker.company.name()}
      <br />
      {faker.company.buzzNoun()}
      <br />
      {faker.company.buzzVerb()}
    </Menu.Item>
  </>
);

export default meta;

export const Default: Story = {
  args: {
    children,
  },
};

export const horizontal: Story = {
  args: {
    variation: "horizontal",
    children,
  },
};
