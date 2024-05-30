import React from "react";
import { Icon, IconBellFill } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Icon", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icon Icon={IconBellFill} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
