import styles from "./index.module.scss";
import React from "react";
import { Container } from "react-ck";
import { NavMenu } from "../NavMenu";

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: Readonly<DefaultLayoutProps>): React.ReactElement => (
  <div className={styles.root}>
    <NavMenu />
    <Container className={styles.container}>{children}</Container>
  </div>
);
