import React from "react";
import { Chip } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Chip", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Chip>Chip</Chip>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
