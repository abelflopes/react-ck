import React from "react";
import { Modal } from "..";
import { LayersProvider } from "@react-ck/layers";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "./mocks/resize-observer";

describe("unit Modal", () => {
  it("renders correctly", async () => {
    const content = "Modal";
    render(
      <LayersProvider>
        <Modal>
          <Modal.Header heading="Heading" />
          {content}
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </LayersProvider>,
    );
    const find = await screen.findByText(content);
    expect(find).toBeInTheDocument();
  });
});
