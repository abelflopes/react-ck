import React from "react";
import { Input } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Input", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
