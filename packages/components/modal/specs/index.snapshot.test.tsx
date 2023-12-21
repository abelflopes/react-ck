import React from "react";
import { Modal, ModalFooter, ModalHeader } from "../src/index";
import { LayersProvider } from "@react-ck/layers";
import renderer, { act, type ReactTestRenderer } from "react-test-renderer";

describe("Snapshot Modal", () => {
  test("renders correctly", async () => {
    let component: ReactTestRenderer | undefined;

    await act(() => {
      component = renderer.create(
        <LayersProvider>
          <Modal>
            <ModalHeader heading="Heading" />
            <ModalFooter>Footer</ModalFooter>
          </Modal>
        </LayersProvider>,
      );
    });

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
