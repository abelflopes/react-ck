import React from "react";
import { Container, Text } from "react-ck";
import { TestContextDisplay } from "../components/TestContextDisplay";

export const TestPage = (): React.ReactElement => (
  <Container spacingY="l">
    <Text variation="h1">Test</Text>
    <Text>This is a test page.</Text>
    <TestContextDisplay />
  </Container>
);
