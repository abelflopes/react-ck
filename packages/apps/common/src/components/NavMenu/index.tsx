import styles from "./index.module.scss";
import React from "react";
import { NavLink, generatePath } from "react-router-dom";
import { routesList } from "../../routes/routes-list";

export const NavMenu = (): React.ReactElement => (
  <nav className={styles.root}>
    <NavLink to={generatePath(routesList.home)}>Home</NavLink>
    <NavLink to={generatePath(routesList.login)}>Login</NavLink>
    <NavLink to={generatePath(routesList.quote)}>Quote</NavLink>
  </nav>
);
