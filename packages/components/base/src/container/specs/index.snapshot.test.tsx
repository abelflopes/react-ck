import React from "react";
import { Container } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Container", () => {
  it("renders correctly", () => {
    const tree = render(<Container>Container</Container>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
