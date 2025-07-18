import React from "react";
import { Grid } from "../index";
import { render } from "@testing-library/react";

describe("snapshot GridContainer", () => {
  it("renders correctly", () => {
    const tree = render(<Grid />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});

describe("snapshot GridColumn", () => {
  it("renders correctly", () => {
    const tree = render(<Grid.Column />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
