import React from "react";
import { List } from "../index";
import renderer from "react-test-renderer";

describe("snapshot List", () => {
  it("renders correctly", () => {
    const content = "List";
    const tree = renderer.create(<List items={[content]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
