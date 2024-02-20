import React from "react";
import { Alert } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Alert", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Alert>Alert</Alert>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
