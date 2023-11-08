import React from "react";
import { Text } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Text", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Text>Text</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
