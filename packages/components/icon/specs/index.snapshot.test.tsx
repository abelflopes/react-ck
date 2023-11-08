import React from "react";
import { Icon } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Icon", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Icon name="bell-filled" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
