import React from "react";
import { DataTable } from "../index";
import { render } from "@testing-library/react";

describe("snapshot DataTable", () => {
  it("renders correctly", () => {
    const data = [{ a: 1, b: 2, c: 3 }];
    const tree = render(<DataTable data={data} data-testid="table" />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
