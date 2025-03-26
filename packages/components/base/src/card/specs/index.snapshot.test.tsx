import React from "react";
import { Card } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Card", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Card>Card</Card>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
