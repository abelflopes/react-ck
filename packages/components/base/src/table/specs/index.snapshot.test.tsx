import React from "react";
import { Table } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Table", () => {
  it("renders correctly", () => {
    const tree = render(<Table>Table</Table>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
