import React from "react";
import { Alert } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Alert", () => {
  it("renders correctly", () => {
    const tree = render(<Alert>Alert</Alert>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
