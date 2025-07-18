import React from "react";
import { Skeleton } from "../index";
import { render } from "@testing-library/react";

describe("snapshot Skeleton", () => {
  beforeAll(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    const tree = render(<Skeleton />).asFragment();
    expect(tree).toMatchSnapshot();
  });
});
