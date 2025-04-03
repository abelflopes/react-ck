import React from "react";
import { Skeleton } from "../index";
import renderer from "react-test-renderer";

describe("snapshot Skeleton", () => {
  beforeAll(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Skeleton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
