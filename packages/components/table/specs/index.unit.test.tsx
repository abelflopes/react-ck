import React from "react";
import { Table } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Table", () => {
  test("renders correctly", async () => {
    const content = "Table";
    render(<Table>{content}</Table>);
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
