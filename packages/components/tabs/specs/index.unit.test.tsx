import React from "react";
import { Tabs } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Tabs", () => {
  it("renders correctly", async () => {
    const items = [
      { id: "1", heading: "item 1", content: "content 1" },
      { id: "2", heading: "item 2", content: "content 2" },
    ];

    render(<Tabs items={items} />);

    await Promise.all(
      items.map(async (item) => {
        expect(await screen.findByText(item.heading)).toBeInTheDocument();
      }),
    );

    expect(await screen.findByText(items[0]?.content ?? "")).toBeInTheDocument();
  });
});
