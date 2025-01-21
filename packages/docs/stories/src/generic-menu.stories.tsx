import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Menu } from "@react-ck/provisional/src";
import { Icon } from "@react-ck/icon/src";
import { faker } from "@faker-js/faker";
import { IconUserCircle } from "@react-ck/icon/icons/IconUserCircle";
import { IconVerticalDots } from "@react-ck/icon/icons/IconVerticalDots";
import { Button } from "@react-ck/button/src";

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
      skin="primary"
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
      }>
      {faker.person.firstName()}
    </Menu.Item>
    <Menu.Item
      skin="secondary"
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
      }>
      {faker.person.firstName()}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item
      action={
        <Button
          skin="secondary"
          skinVariation="ghost"
          size="s"
          icon={
            <Icon>
              <IconVerticalDots />
            </Icon>
          }
        />
      }>
      {faker.animal.type()}
    </Menu.Item>
    <Menu.Item disabled>{faker.animal.type()}</Menu.Item>
    <Menu.Item description={faker.animal.type()}>{faker.animal.type()}</Menu.Item>
    <Menu.Item variation="bordered" description={faker.animal.type()}>
      {faker.animal.type()}
    </Menu.Item>
    <Menu.Item
      skin="negative"
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }
      action={
        <Button
          skin="secondary"
          skinVariation="ghost"
          size="s"
          icon={
            <Icon>
              <IconVerticalDots />
            </Icon>
          }
        />
      }>
      {faker.animal.type()}
    </Menu.Item>
    <Menu.Item>{faker.animal.type()}</Menu.Item>
    <Menu.Divider>Companies</Menu.Divider>
    <Menu.Item>{faker.company.name()}</Menu.Item>
    <Menu.Item
      icon={
        <Icon>
          <IconUserCircle />
        </Icon>
      }
      action={
        <Button
          skin="secondary"
          skinVariation="ghost"
          size="s"
          icon={
            <Icon>
              <IconVerticalDots />
            </Icon>
          }
        />
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
