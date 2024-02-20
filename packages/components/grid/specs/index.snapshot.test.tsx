import React from "react";
import { GridContainer, GridColumn } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot GridContainer", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<GridContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("snapshot GridColumn", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<GridColumn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
