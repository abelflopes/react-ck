import React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Manager } from "@react-ck/manager";
import { faker } from "@faker-js/faker";
import { Chip } from "@react-ck/chip/src";
import { configureStory } from "@react-ck/story-config";
import { DataTable } from "@react-ck/data-table/src";

type Story = StoryObj<typeof DataTable>;

const meta: Meta<typeof DataTable> = {
  title: "Generic/DataTable",
  ...configureStory(DataTable, {
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

const col1 = faker.lorem.word();
const col2 = faker.lorem.word();
const col3 = faker.lorem.word();

export default meta;

export const Normal: Story = {
  args: {
    skin: "bordered",
    headers: { [col1]: faker.lorem.word(), [col2]: faker.lorem.word(), [col3]: faker.lorem.word() },
    data: Object.keys(Array.from(Array.from({ length: 10 }))).map(() => ({
      [col1]: faker.date.future().toLocaleDateString(),
      [col2]: faker.company.buzzNoun(),
      [col3]: <Chip>{faker.commerce.price()}</Chip>,
    })),
  },
};

export const AutoHeaders: Story = {
  args: {
    skin: "bordered",
    autoHeaders: true,
    data: Object.keys(Array.from(Array.from({ length: 10 }))).map((i) => ({
      "some_column": faker.date.future().toLocaleDateString(),
      "otherColumn": faker.company.buzzNoun(),
      "last-column": <Chip>{faker.commerce.price()}</Chip>,
    })),
  },
};

export const Sortable: Story = {
  args: {
    skin: "bordered",
    autoHeaders: true,
    sortable: true,
    data: Object.keys(Array.from(Array.from({ length: 10 }))).map(() => {
      const date = new Date(faker.date.future()).toString();

      return {
        name: faker.company.buzzNoun(),
        date,
        Number: Math.round(Math.random() * 100),
        Price: (
          <Chip>
            {faker.commerce.price()}
            {faker.finance.currency().symbol}
          </Chip>
        ),
      };
    }),
  },
};
