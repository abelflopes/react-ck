import React from "react";
import { Container } from "react-ck";
import { NavMenu } from "../NavMenu";

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: Readonly<DefaultLayoutProps>): React.ReactElement => (
  <Container spacingY>
    <NavMenu />
    {children}
  </Container>
);
