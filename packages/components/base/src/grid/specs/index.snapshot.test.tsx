import React from "react";
import { Grid } from "../index";
import renderer from "react-test-renderer";

describe("snapshot GridContainer", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Grid />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("snapshot GridColumn", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Grid.Column />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
