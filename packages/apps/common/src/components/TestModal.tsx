import React, { useState } from "react";
import { Button, Modal } from "react-ck";
import { TestDropdown } from "../components/TestDropdown";

export const TestModal = (): React.ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        skin="secondary"
        skinVariation="muted"
        onClick={() => {
          setModalOpen(true);
        }}>
        Test Modal
      </Button>

      {modalOpen ? (
        <Modal
          onDismiss={() => {
            setModalOpen(false);
          }}>
          <Modal.Header>Header</Modal.Header>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, voluptate!
          <TestDropdown />
          <Modal.Footer
            actions={
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}>
                Close
              </Button>
            }
          />
        </Modal>
      ) : null}
    </>
  );
};
