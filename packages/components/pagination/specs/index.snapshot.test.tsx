import React from "react";
import { Pagination } from "../src/index";
import renderer, { act, type ReactTestRenderer } from "react-test-renderer";

describe("Snapshot Pagination", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer | undefined;

    await act(() => {
      component = renderer.create(<Pagination current={10} slots={7} total={20} />);
    });

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
