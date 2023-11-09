import React from "react";
import { GridContainer, GridColumn } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot GridContainer", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<GridContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Snapshot GridColumn", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<GridColumn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
