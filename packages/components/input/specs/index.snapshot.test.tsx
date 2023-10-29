import React from "react";
import { Input } from "../src/index";
import renderer from "react-test-renderer";

describe("Input", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
