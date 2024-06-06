import React from "react";
import renderer from "react-test-renderer";
import { Icon } from "../src/index";
import { IconBellFill } from "../src/icons/IconBellFill";

describe("snapshot Icon", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icon Icon={IconBellFill} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
