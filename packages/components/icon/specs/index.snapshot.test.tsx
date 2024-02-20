import React from "react";
import { Icon } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Icon", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icon name="bell-filled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
