import React from "react";
import { Icon, BellFill } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Icon", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icon Icon={BellFill} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
