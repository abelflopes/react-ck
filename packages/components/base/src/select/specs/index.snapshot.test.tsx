import React from "react";
import renderer from "react-test-renderer";
import { Select } from "../index";

describe("snapshot Select", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Select />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
