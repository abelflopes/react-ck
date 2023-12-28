import React from "react";
import { EmptyState } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot EmptyState", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<EmptyState>EmptyState</EmptyState>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
