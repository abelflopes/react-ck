import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { configureStory } from "@react-ck/story-config";
import { Table } from "@react-ck/table/src";
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

const columns = 8;
const rows = 5;

const children = [
  <thead key="head">
    <tr>
      {Object.keys(Array.from(Array.from({ length: columns }))).map((i) => (
        <th key={i}>{CC.capitalCase(faker.company.buzzAdjective())}</th>
      ))}
    </tr>
  </thead>,
  <tbody key="body">
    {Object.keys(Array.from(Array.from({ length: rows }))).map((r) => (
      <tr key={r}>
        {Object.keys(Array.from(Array.from({ length: columns }))).map((i) => (
          <td key={i}>{faker.company.catchPhraseDescriptor()}</td>
        ))}
      </tr>
    ))}
  </tbody>,
];

export default meta;

export const Normal: Story = {
  args: {
    skin: "bordered",
    children,
  },
};

export const Scrollable: Story = {
  decorators: [
    (Story: () => React.ReactElement): React.ReactElement => (
      <div style={{ height: "200px" }}>
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
