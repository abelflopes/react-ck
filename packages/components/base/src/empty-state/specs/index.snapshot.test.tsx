import React from "react";
import { EmptyState } from "../index";
import { render } from "@testing-library/react";

describe("snapshot EmptyState", () => {
  it("renders correctly", () => {
    const tree = render(<EmptyState>EmptyState</EmptyState>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
