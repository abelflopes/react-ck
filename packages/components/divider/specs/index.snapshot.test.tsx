import React from "react";
import { Divider } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Divider", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Divider>Divider</Divider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
