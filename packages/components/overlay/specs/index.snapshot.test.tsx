import React from "react";
import { Overlay } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Overlay", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Overlay skin="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
