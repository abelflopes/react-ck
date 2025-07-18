import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Menu, Button, Manager, Icon } from "react-ck";
import { faker } from "@faker-js/faker";
import { IconUserCircle } from "@react-ck/icon/icons/IconUserCircle";
import { IconVerticalDots } from "@react-ck/icon/icons/IconVerticalDots";

const meta: Meta<typeof Menu> = {
  title: "Generic/Menu",
  ...configureStory(Menu, {
    subcomponents: { "Menu.Item": Menu.Item, "Menu.Divider": Menu.Divider },
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
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

type Story = StoryObj<typeof meta>;

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
