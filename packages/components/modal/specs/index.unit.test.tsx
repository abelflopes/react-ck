import React from "react";
import { Modal } from "../src/index";
import { LayersProvider } from "@react-ck/layers";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Unit Modal", () => {
  test("renders correctly", async () => {
    const content = "Modal";
    render(
      <LayersProvider>
        <Modal>{content}</Modal>
      </LayersProvider>,
    );
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
