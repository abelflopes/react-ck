import React from "react";
import { Pagination } from "../index";
import { render, act } from "@testing-library/react";

describe("snapshot Pagination", () => {
  it("renders correctly", () => {
    const tree = render(null);

    act(() => {
      tree.rerender(<Pagination current={10} slots={7} total={20} />);
    });

    expect(tree.asFragment()).toMatchSnapshot();
  });
});
