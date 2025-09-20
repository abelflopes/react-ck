import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { configureStory } from "@react-ck/storybook-utils";
import { Table, Manager, Checkbox } from "react-ck";
import { faker } from "@faker-js/faker";
import * as CC from "change-case";

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
      <Table.Th>
        <Checkbox indeterminate />
      </Table.Th>
      {Object.keys(Array.from({ length: columns })).map((i) => (
        <Table.Th key={i}>{CC.capitalCase(faker.company.buzzAdjective())}</Table.Th>
      ))}
    </Table.Tr>
    <Table.Tr>
      <Table.Th>
        <Checkbox indeterminate />
      </Table.Th>
      <Table.Th colSpan={columns}>{CC.capitalCase(faker.company.buzzAdjective())}</Table.Th>
    </Table.Tr>
  </Table.Thead>,
  <Table.TBody key="body">
    {Object.keys(Array.from({ length: rows })).map((r) => (
      <Table.Tr key={r} selected={r === "1"} interactive={Number(r) < rows / 2}>
        <Table.Td>
          <Checkbox />
        </Table.Td>
        <Table.Td>
          <div
            style={{ background: "pink", position: "relative", zIndex: 1, height: 20, width: 20 }}
          />
        </Table.Td>
        {Object.keys(Array.from({ length: columns })).map((i) => (
          <Table.Td key={i}>{faker.company.catchPhraseDescriptor()}</Table.Td>
        ))}
      </Table.Tr>
    ))}
  </Table.TBody>,
  <Table.TFoot key="footer">
    <Table.Tr>
      <Table.Th></Table.Th>
      {Object.keys(Array.from({ length: columns })).map((i) => (
        <Table.Th key={i}>{CC.capitalCase(faker.company.buzzAdjective())}</Table.Th>
      ))}
    </Table.Tr>
  </Table.TFoot>,
];

export default meta;

type Story = StoryObj<typeof meta>;

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
    skin: "bordered-column",
    children,
  },
};
