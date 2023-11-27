import React from "react";
import { Spinner } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Spinner", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
