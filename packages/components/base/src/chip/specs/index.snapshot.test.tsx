import React from "react";
import { Chip } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Chip", () => {
  it("renders correctly", () => {
    const tree = render(<Chip>Chip</Chip>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
