import React from "react";
import { Skeleton } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Skeleton", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Skeleton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
