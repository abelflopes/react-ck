import React from "react";
import { Skeleton } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Skeleton", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Skeleton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
