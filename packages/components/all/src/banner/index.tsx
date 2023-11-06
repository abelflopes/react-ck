import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Container } from "../container";
import { ThemeContextProvider } from "@rck/theme";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  actions?: React.ReactNode[];
}

export const Banner = ({
  src,
  alt,
  actions,
  children,
  className,
  ...otherProps
}: Readonly<BannerProps>): React.ReactElement => (
  <ThemeContextProvider
    value={{
      inverted: true,
    }}>
    <div className={classNames(styles.root, className)} {...otherProps}>
      <Container spacingY className={styles.container} variation="big">
        {children}
        {actions?.length && <div className={styles.actions}>{actions}</div>}
      </Container>
      <img className={styles.image} alt={alt} src={src} />
    </div>
  </ThemeContextProvider>
);
