import React from "react";
import { Card } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Card", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Card>Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
