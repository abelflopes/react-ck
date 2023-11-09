import React from "react";
import { GridContainer, GridColumn } from "../src/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit GridContainer", () => {
  test("renders correctly", async () => {
    render(<GridContainer data-testid="container" />);
    const find = await screen.findByTestId("container");
    expect(find).toBeInTheDocument();
  });
});

describe("Unit GridColumn", () => {
  test("renders correctly", async () => {
    render(<GridColumn data-testid="column" />);
    const find = await screen.findByTestId("column");
    expect(find).toBeInTheDocument();
  });
});
