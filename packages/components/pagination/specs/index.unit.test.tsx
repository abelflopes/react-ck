import React from "react";
import { Pagination } from "../src/index";
import { LayersProvider } from "@react-ck/layers";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Pagination", () => {
  test("renders correctly", async () => {
    const content = "Pagination";
    render(
      <LayersProvider>
        <Pagination>{content}</Pagination>
      </LayersProvider>,
    );
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
