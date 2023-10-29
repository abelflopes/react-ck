import React from "react";
import { Button } from "../src/index";
import renderer from "react-test-renderer";

describe("Button", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Button>Button</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
