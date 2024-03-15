import React from "react";
import { createRoot } from "react-dom/client";
import { Button, Container, Manager, Text } from "react-ck";

import * as RCK from "react-ck";

console.log("RCK", RCK);

const el = document.querySelector("#root");

if (!el) throw new Error("Missing root element");

const App = (): React.ReactElement => (
  <React.StrictMode>
    <Manager>
      <Container spacingY>
        <Text variation="h1">Parcel App</Text>
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
        <Button>Ok</Button>
      </Container>
    </Manager>
  </React.StrictMode>
);

const root = createRoot(el);

root.render(<App />);
