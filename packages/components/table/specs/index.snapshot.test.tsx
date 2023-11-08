import React from "react";
import { Table } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot Table", () => {
  test("renders correctly", async () => {
    const tree = renderer.create(<Table>Table</Table>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
