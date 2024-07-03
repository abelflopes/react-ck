import React from "react";
import renderer from "react-test-renderer";
import { Autocomplete } from "../src/index";

describe("snapshot Autocomplete", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Autocomplete />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
