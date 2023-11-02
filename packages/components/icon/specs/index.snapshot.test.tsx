import React from "react";
import { Icon } from "../src/index";
import renderer from "react-test-renderer";

describe("Icon", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Icon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
