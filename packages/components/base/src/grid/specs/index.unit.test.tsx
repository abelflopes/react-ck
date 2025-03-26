import React from "react";
import { Grid } from "../index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("unit GridContainer", () => {
  it("renders correctly", async () => {
    render(<Grid data-testid="container" />);
    const find = await screen.findByTestId("container");
    expect(find).toBeInTheDocument();
  });
});

describe("unit GridColumn", () => {
  it("renders correctly", async () => {
    render(
      <Grid>
        <Grid.Column data-testid="column" />
      </Grid>,
    );
    const find = await screen.findByTestId("column");
    expect(find).toBeInTheDocument();
  });
});
