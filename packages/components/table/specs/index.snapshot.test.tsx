import React from "react";
import { Table } from "../src/index";
import renderer from "react-test-renderer";

describe("snapshot Table", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Table>Table</Table>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
