import React from "react";
import { Divider } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Divider", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Divider />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
