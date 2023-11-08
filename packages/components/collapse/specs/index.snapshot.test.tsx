import React from "react";
import { Collapse } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Collapse", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Collapse>Collapse</Collapse>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
