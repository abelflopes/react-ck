import React from "react";
import { EmptyState } from "../index";
import renderer from "react-test-renderer";

describe("snapshot EmptyState", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<EmptyState>EmptyState</EmptyState>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
