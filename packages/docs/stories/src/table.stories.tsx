import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@rck/theme";
import { Table } from "@rck/table/src";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    skin: "bordered",
    children: (
      <>
        <thead>
          <tr>
            <th>deprecator</th>
            <th>vomer</th>
            <th>amplus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>02/03/2024</td>
            <td>action-items</td>
            <td>
              <div>92.00</div>
            </td>
          </tr>
          <tr>
            <td>28/01/2024</td>
            <td>portals</td>
            <td>
              <div>859.00</div>
            </td>
          </tr>
          <tr>
            <td>09/07/2024</td>
            <td>schemas</td>
            <td>
              <div>255.00</div>
            </td>
          </tr>
          <tr>
            <td>29/06/2024</td>
            <td>infrastructures</td>
            <td>
              <div>81.00</div>
            </td>
          </tr>
          <tr>
            <td>26/11/2023</td>
            <td>initiatives</td>
            <td>
              <div>849.00</div>
            </td>
          </tr>
          <tr>
            <td>16/09/2024</td>
            <td>technologies</td>
            <td>
              <div>336.00</div>
            </td>
          </tr>
          <tr>
            <td>20/12/2023</td>
            <td>models</td>
            <td>
              <div>80.00</div>
            </td>
          </tr>
          <tr>
            <td>06/03/2024</td>
            <td>ROI</td>
            <td>
              <div>676.00</div>
            </td>
          </tr>
          <tr>
            <td>07/12/2023</td>
            <td>interfaces</td>
            <td>
              <div>238.00</div>
            </td>
          </tr>
          <tr>
            <td>29/11/2023</td>
            <td>relationships</td>
            <td>
              <div>922.00</div>
            </td>
          </tr>
        </tbody>
      </>
    ),
  },
};
