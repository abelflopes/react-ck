import React from "react";
import { Textarea } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Textarea", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Textarea />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
