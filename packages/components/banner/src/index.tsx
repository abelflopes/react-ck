import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Container } from "@rck/container";
import { ThemeContextProvider } from "@rck/theme";
import { Overlay } from "@rck/overlay";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL of the banner image */
  src: string;
  /** The alternative text for the banner image */
  alt?: string;
  /** An array of React nodes representing actions or buttons displayed on the banner */
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
      <Overlay />
    </div>
  </ThemeContextProvider>
);
