import React from "react";
import { Accordion } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Accordion", () => {
  test("renders correctly", async () => {
    const items = [
      { header: "item 1", children: "content 1" },
      { header: "item 2", children: "content 2" },
    ];

    render(<Accordion items={items} />);

    await Promise.all(
      items.map(async (item) => {
        const header = await screen.findByText(item.header);
        const children = await screen.findByText(item.children);
        expect(header).toBeInTheDocument();
        expect(children).toBeInTheDocument();
      }),
    );
  });
});
