import styles from "./index.module.scss";
import React from "react";
import { Card, Container, Text } from "react-ck";
import { Link, generatePath } from "react-router-dom";
import { routesList } from "../../routes/routes-list";

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: Readonly<AuthLayoutProps>): React.ReactElement => (
  <Container spacingY className={styles.root}>
    <Card skin="shadowed" spacing="l" className={styles.card}>
      <div className={styles.content}>{children}</div>
    </Card>
    <Text>
      <Text skin="link" as={<Link to={generatePath(routesList.termsOfService)} />}>
        Terms of services
      </Text>
      &nbsp; and &nbsp;
      <Text skin="link" as={<Link to={generatePath(routesList.privacyPolicy)} />}>
        Privacy Policy
      </Text>
    </Text>
  </Container>
);
