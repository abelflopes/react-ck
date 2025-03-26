import React from "react";
import { Textarea } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Textarea", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Textarea />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
