import React from "react";
import { Collapse } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Collapse", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Collapse header="Header">Collapse</Collapse>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
