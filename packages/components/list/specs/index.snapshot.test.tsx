import React from "react";
import { List } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot List", () => {
  test("renders correctly", async () => {
    const content = "List";
    const tree = renderer.create(<List items={[content]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
