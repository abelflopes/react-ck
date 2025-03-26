import React from "react";
import { Text } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Text", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Text>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
