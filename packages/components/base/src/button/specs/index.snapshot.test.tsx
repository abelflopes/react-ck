import React from "react";
import { Button } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Button", () => {
  it("renders correctly", () => {
    const tree = render(<Button>Button</Button>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
