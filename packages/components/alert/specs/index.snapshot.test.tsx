import React from "react";
import { Alert } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Alert", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Alert>Alert</Alert>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
