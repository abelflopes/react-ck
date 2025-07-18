import React from "react";
import { Text } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Text", () => {
  it("renders correctly", () => {
    const tree = render(<Text>Text</Text>).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
