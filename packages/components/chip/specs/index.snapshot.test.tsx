import React from "react";
import { Chip } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Chip", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Chip>Chip</Chip>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
