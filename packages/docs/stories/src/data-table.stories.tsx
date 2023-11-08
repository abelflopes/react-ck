import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { faker } from "@faker-js/faker";
import { DataTable } from "@rck/data-table/src";
import { Chip } from "@rck/chip/src";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

const col1 = faker.lorem.word();
const col2 = faker.lorem.word();
const col3 = faker.lorem.word();

export const Default: Story = {
  args: {
    skin: "bordered",
    headers: { [col1]: faker.lorem.word(), [col2]: faker.lorem.word(), [col3]: faker.lorem.word() },
    data: Object.keys(Array.from(Array.from({ length: 10 }))).map((index) => ({
      [col1]: faker.date.future().toLocaleDateString(),
      [col2]: faker.company.buzzNoun(),
      [col3]: <Chip>{faker.commerce.price()}</Chip>,
    })),
  },
};
