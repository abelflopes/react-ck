import React from "react";
import { Select } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Select", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Select />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
