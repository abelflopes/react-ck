import React from "react";
import { Progress } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Progress", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Progress value={50} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
