import React, { useState } from "react";
import { Button, Container, Text, DataTable, Modal } from "react-ck";
import { useAppContext } from "../context/app";

export const HomePage = (): React.ReactElement => {
  const { title } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Container spacingY="l">
        <Text variation="h1">{title} - Home</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptate a assumenda nulla
          minus corporis nisi commodi dolores, minima facilis quis, maxime perspiciatis non facere
          quod aperiam placeat repudiandae ex id quae. Quisquam repellat cum incidunt atque aut
          dolores modi laborum dolorem sapiente, esse dignissimos pariatur optio quibusdam vitae
          quas fugiat officia harum. Sint cumque voluptatem nemo aperiam reprehenderit consequuntur
          molestias, labore corporis, magnam fugit facilis laudantium corrupti similique ad quidem.
          A facilis accusantium sequi ab saepe fuga qui architecto error debitis, tempore suscipit
          quo quae nesciunt voluptas ipsam vel odit minima, nemo modi dolorem aut. Blanditiis rerum
          modi magnam.
        </Text>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}>
          Open
        </Button>

        <Text variation="h2">Multiples</Text>

        <DataTable
          skin="bordered"
          data={Object.keys(Array.from(Array(10))).map((key) => ({
            "": (
              <Text skin="bold" as="span">
                N{key}
              </Text>
            ),
            ...Object.fromEntries(
              Object.keys(Array.from(Array(100))).map((k) => {
                const n = Number(k) * Number(key);
                return [`N${k}`, n];
              }),
            ),
          }))}
          autoHeaders
          sortable
          scrollable
        />
      </Container>

      {modalOpen ? (
        <Modal
          onDismiss={() => {
            setModalOpen(false);
          }}>
          <Modal.Header heading="Header" />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, voluptate!
          <Modal.Footer>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};
