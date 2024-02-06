import React from "react";
import { Modal, ModalFooter, ModalHeader } from "../src/index";
import { LayersProvider } from "@react-ck/layers";
import { getActRender } from "@react-ck/jest-config";

describe("snapshot Modal", () => {
  it("renders correctly", async () => {
    const component = await getActRender(
      <LayersProvider>
        <Modal>
          <ModalHeader heading="Heading" />
          <ModalFooter>Footer</ModalFooter>
        </Modal>
      </LayersProvider>,
    );

    expect(component?.toJSON()).toMatchSnapshot();
  });
});
