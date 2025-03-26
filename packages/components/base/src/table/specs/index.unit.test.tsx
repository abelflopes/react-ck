import React from "react";
import { Table } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit Table", () => {
  it("renders correctly", async () => {
    const content = "Table";
    render(<Table>{content}</Table>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
