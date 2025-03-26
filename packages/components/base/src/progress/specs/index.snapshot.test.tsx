import React from "react";
import { Progress } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Progress", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Progress value={50} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
