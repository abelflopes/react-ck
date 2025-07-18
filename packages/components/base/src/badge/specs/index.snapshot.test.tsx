import React from "react";
import { Badge } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Badge", () => {
  it("renders correctly", () => {
    const tree = render(<Badge>Badge</Badge>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
