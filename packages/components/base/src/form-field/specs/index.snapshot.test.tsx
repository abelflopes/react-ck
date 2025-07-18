import React from "react";
import { FormField } from "../index";
import { render } from "@testing-library/react";

describe("snapshot FormField", () => {
  it("renders correctly", () => {
    const tree = render(<FormField>FormField</FormField>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
