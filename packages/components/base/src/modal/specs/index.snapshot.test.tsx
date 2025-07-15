import React from "react";
import { Modal } from "..";
import { LayersProvider } from "@react-ck/layers";
import { getActRender } from "@react-ck/jest-config";

describe("snapshot Modal", () => {
  it("renders correctly", async () => {
    const component = await getActRender(
      <LayersProvider usePortal={false}>
        <Modal>
          <Modal.Header>Heading</Modal.Header>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
      </LayersProvider>,
    );

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
