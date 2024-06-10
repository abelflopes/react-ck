import React from "react";
import renderer from "react-test-renderer";
import { Icon } from "../src/index";

describe("snapshot Icon", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icon>x</Icon>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
