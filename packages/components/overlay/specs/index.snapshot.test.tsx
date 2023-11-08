import React from "react";
import { Overlay } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Overlay", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Overlay skin="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
