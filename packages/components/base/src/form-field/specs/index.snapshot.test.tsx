import React from "react";
import { FormField } from "../index";
import renderer from "react-test-renderer";

describe("snapshot FormField", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<FormField>FormField</FormField>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
