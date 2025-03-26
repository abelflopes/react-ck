import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Table } from "@react-ck/base-components/src";
import { faker } from "@faker-js/faker";
import * as CC from "change-case";

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: "Generic/Table",
  ...configureStory(Table, {
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

const columns = 6;
const rows = 4;

const children = [
  <Table.Thead key="head">
    <Table.Tr>
      {Object.keys(Array.from(Array.from({ length: columns }))).map((i) => (
        <Table.Th key={i}>{CC.capitalCase(faker.company.buzzAdjective())}</Table.Th>
      ))}
    </Table.Tr>
  </Table.Thead>,
  <Table.TBody key="body">
    {Object.keys(Array.from(Array.from({ length: rows }))).map((r) => (
      <Table.Tr key={r}>
        {Object.keys(Array.from(Array.from({ length: columns }))).map((i) => (
          <Table.Td key={i}>{faker.company.catchPhraseDescriptor()}</Table.Td>
        ))}
      </Table.Tr>
    ))}
  </Table.TBody>,
  <Table.TFoot key="footer">
    <Table.Tr>
      {Object.keys(Array.from(Array.from({ length: columns }))).map((i) => (
        <Table.Th key={i}>{CC.capitalCase(faker.company.buzzAdjective())}</Table.Th>
      ))}
    </Table.Tr>
  </Table.TFoot>,
];

export default meta;

export const Normal: Story = {
  args: {
    skin: "bordered",
    spacing: "default",
    children,
  },
};

export const Scrollable: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <div style={{ height: "200px", width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    scrollable: true,
    skin: "bordered",
    children,
  },
};
