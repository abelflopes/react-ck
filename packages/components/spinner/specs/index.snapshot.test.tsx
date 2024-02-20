import React from "react";
import { Spinner } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Spinner", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
