import React from "react";
import { Button, Container, Manager, Text, DataTable, Modal } from "react-ck";

const el = document.querySelector("#root");

if (!el) throw new Error("Missing root element");

export interface CommonAppProps {
  title: string;
}

export const CommonApp = ({ title }: Readonly<CommonAppProps>): React.ReactElement => (
  <Manager>
    <Container spacingY>
      <Text variation="h1">{title}</Text>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptate a assumenda nulla
        minus corporis nisi commodi dolores, minima facilis quis, maxime perspiciatis non facere
        quod aperiam placeat repudiandae ex id quae. Quisquam repellat cum incidunt atque aut
        dolores modi laborum dolorem sapiente, esse dignissimos pariatur optio quibusdam vitae quas
        fugiat officia harum. Sint cumque voluptatem nemo aperiam reprehenderit consequuntur
        molestias, labore corporis, magnam fugit facilis laudantium corrupti similique ad quidem. A
        facilis accusantium sequi ab saepe fuga qui architecto error debitis, tempore suscipit quo
        quae nesciunt voluptas ipsam vel odit minima, nemo modi dolorem aut. Blanditiis rerum modi
        magnam.
      </Text>
      <Button>Ok</Button>

      <Text variation="h2">Multiples</Text>

      <DataTable
        autoHeaders
        sortable
        scrollable
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
      />
    </Container>

    <Modal>
      <Modal.Header heading="Header" />
      Modal content
    </Modal>
  </Manager>
);
