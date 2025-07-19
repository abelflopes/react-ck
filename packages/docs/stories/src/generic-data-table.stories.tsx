import React, { useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { Chip, DataTable, Input, Text, Alert, Manager } from "react-ck";
import { configureStory } from "@react-ck/storybook-utils";

const meta: Meta<typeof DataTable> = {
  title: "Generic/Data Table",
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

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    skin: "bordered",
    headers: { [col1]: faker.lorem.word(), [col2]: faker.lorem.word(), [col3]: faker.lorem.word() },
    data: Object.keys(Array.from({ length: 10 })).map(() => ({
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
    data: Object.keys(Array.from({ length: 10 })).map(() => ({
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
    data: Object.keys(Array.from({ length: 10 })).map(() => {
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

export const WithStatefulChildren: Story = {
  /* eslint-disable react-hooks/rules-of-hooks -- lint unable to identify that component is react */
  render: (): React.ReactElement => {
    const [value, setValue] = useState("");

    return (
      <>
        <Text>
          Stateful content inside data table might induce re-renders. In case of inputs, they will
          use focus. To mitigate this, assign state only on the end of change, as on blur event.
          <br /> <br />
          You can also use the Table component directly to avoid this workaround.
        </Text>

        <Alert>Value: &quot;{value}&quot;</Alert>

        <br />

        <DataTable
          skin="bordered"
          data={[
            {
              airline: faker.airline.airline().name,
              someInput: (
                <Input
                  placeholder="Description"
                  defaultValue={value}
                  onBlur={(e) => {
                    setValue(e.target.value);
                  }}
                />
              ),
            },
          ]}
          autoHeaders
        />
      </>
    );
  },
  /* eslint-enable */
};
