import React from "react";
import { Select } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Select", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Select />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
