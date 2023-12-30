import React from "react";
import { Tabs } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Tabs", () => {
  test("renders correctly", async () => {
    const items = [
      { heading: "item 1", content: "content 1" },
      { heading: "item 2", content: "content 2" },
    ];

    render(<Tabs items={items} />);

    await Promise.all(
      items.map(async (item) => {
        const header = await screen.findByText(item.heading);
        const children = await screen.findByText(item.content);
        expect(header).toBeInTheDocument();
        expect(children).toBeInTheDocument();
      }),
    );
  });
});
