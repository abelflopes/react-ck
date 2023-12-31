import React from "react";
import { DataTable, type DataTableProps } from "../src/index";
import renderer from "react-test-renderer";

describe("Snapshot DataTable", () => {
  test("renders correctly", async () => {
    const data: DataTableProps["data"] = [{ a: 1, b: 2, c: 3 }];
    const tree = renderer.create(<DataTable data={data} data-testid="table" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
