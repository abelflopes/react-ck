import React from "react";
import { DataTable } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit DataTable", () => {
  it("renders correctly", async () => {
    const data = [{ a: 1, b: 2, c: 3 }];
    render(<DataTable data={data} data-testid="table" />);
    const find = await screen.findByTestId("table");
    expect(find).toBeInTheDocument();
  });
});
