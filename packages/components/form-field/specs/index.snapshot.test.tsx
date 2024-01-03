import React from "react";
import { FormField } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot FormField", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<FormField>FormField</FormField>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
