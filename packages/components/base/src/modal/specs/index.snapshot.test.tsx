import React, { act } from "react";
import { Modal } from "..";
import { LayersProvider } from "@react-ck/layers";
import { render } from "@testing-library/react";
import "./mocks/resize-observer";

describe("snapshot Modal", () => {
  it("renders correctly", () => {
    const tree = render(null);

    act(() => {
      tree.rerender(
        <LayersProvider usePortal={false}>
          <Modal>
            <Modal.Header>Heading</Modal.Header>
            <Modal.Footer>Footer</Modal.Footer>
          </Modal>
        </LayersProvider>,
      );
    });

    expect(tree.asFragment()).toMatchSnapshot();
  });
});
