import React from "react";
import { Container, Text } from "react-ck";

export const ErrorPage = (): React.ReactElement => (
  <Container spacingY>
    <Text variation="h1">Oops, something happened</Text>
    <Text>We are currently experiencing some issues. Please try again later.</Text>
  </Container>
);
