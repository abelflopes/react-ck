import React from "react";
import { Pagination, PaginationFooter, PaginationHeader } from "../src/index";
import { LayersProvider } from "@react-ck/layers";
import renderer, { act, type ReactTestRenderer } from "react-test-renderer";

describe("Snapshot Pagination", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer | undefined;

    await act(() => {
      component = renderer.create(
        <LayersProvider>
          <Pagination>
            <PaginationHeader heading="Heading" />
            <PaginationFooter>Footer</PaginationFooter>
          </Pagination>
        </LayersProvider>,
      );
    });

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
