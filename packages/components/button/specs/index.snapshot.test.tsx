import React from "react";
import { Button } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Button", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Button>Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
