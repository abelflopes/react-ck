import React, { useState } from "react";
import { Button, Container, Text, DataTable, Modal, Flex } from "react-ck";
import { useAppContext } from "../context/app";
import { TestContextDisplay } from "../components/TestContextDisplay";
import { TestDropdown } from "../components/TestDropdown";
import { TestModal } from "../components/TestModal";
import { TestTable } from "../components/TestTable";

export const HomePage = (): React.ReactElement => {
  const { title } = useAppContext();

  return (
    <>
      <Container spacingY="l">
        <Flex direction="column" align="stretch">
          <Text margin="none" variation="h1">
            {title} - Home
          </Text>
          <Text margin="none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptate a assumenda
            nulla minus corporis nisi commodi dolores, minima facilis quis, maxime perspiciatis non
            facere quod aperiam placeat repudiandae ex id quae. Quisquam repellat cum incidunt atque
            aut dolores modi laborum dolorem sapiente, esse dignissimos pariatur optio quibusdam
            vitae quas fugiat officia harum. Sint cumque voluptatem nemo aperiam reprehenderit
            consequuntur molestias, labore corporis, magnam fugit facilis laudantium corrupti
            similique ad quidem. A facilis accusantium sequi ab saepe fuga qui architecto error
            debitis, tempore suscipit quo quae nesciunt voluptas ipsam vel odit minima, nemo modi
            dolorem aut. Blanditiis rerum modi magnam.
          </Text>

          <TestContextDisplay />

          <TestModal />

          <TestDropdown />

          <TestTable />
        </Flex>
      </Container>
    </>
  );
};
