import React from "react";
import { List } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit List", () => {
  it("renders correctly", async () => {
    const content = "List";
    render(<List items={[content]} />);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
