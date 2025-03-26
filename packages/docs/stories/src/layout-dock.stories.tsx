import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Avatar, Dock } from "@react-ck/base-components/src";
import { faker } from "@faker-js/faker";
import { IconNotification } from "@react-ck/icon/icons/IconNotification";
import { IconCog } from "@react-ck/icon/icons/IconCog";
import { IconFolder } from "@react-ck/icon/icons/IconFolder";
import { IconHome } from "@react-ck/icon/icons/IconHome";
import { IconUserCircle } from "@react-ck/icon/icons/IconUserCircle";

type Story = StoryObj<typeof Dock>;

const meta: Meta<typeof Dock> = {
  title: "Layout/Dock",
  ...configureStory(Dock, {
    decorators: [
      (Story): React.ReactElement => (
        <Manager>
          <Story />
        </Manager>
      ),
    ],
  }),
};

const name = faker.person.fullName();
const header = (
  <Dock.MainItem image={<Avatar name={name} image={faker.image.avatar()} skin="square" />}>
    {name}
  </Dock.MainItem>
);

const footer = (
  <>
    <Dock.Item label="Notifications" active={false} icon={<IconNotification />} />
    <Dock.Item label="Settings" active={false} icon={<IconCog />} />
    <Dock.Item label="Profile" active={false} icon={<IconUserCircle />} disabled />
  </>
);

const children = (
  <>
    <Dock.Item label="Home" icon={<IconHome />} active />
    <Dock.Item label="Projects" active={false} icon={<IconFolder />} />
  </>
);

export default meta;

export const Collapsed: Story = {
  args: {
    header,
    footer,
    expanded: false,
    children,
  },
};

export const expanded: Story = {
  args: {
    header,
    footer,
    expanded: true,
    children,
  },
};
