import React from "react";
import { DataTable, type DataTableProps } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit DataTable", () => {
  test("renders correctly", async () => {
    const data: DataTableProps["data"] = [{ a: 1, b: 2, c: 3 }];
    render(<DataTable data={data} data-testid="table" />);
    const find = await screen.findByTestId("table");
    expect(find).toBeInTheDocument();
  });
});
