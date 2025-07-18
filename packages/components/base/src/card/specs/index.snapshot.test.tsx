import React from "react";
import { Card } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Card", () => {
  it("renders correctly", () => {
    const tree = render(<Card>Card</Card>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
