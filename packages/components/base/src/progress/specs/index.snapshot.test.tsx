import React from "react";
import { Progress } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Progress", () => {
  it("renders correctly", () => {
    const tree = render(<Progress value={50} />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
