import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Container } from "@react-ck/container";
import { ThemeContextProvider } from "@react-ck/theme";
import { Overlay } from "@react-ck/overlay";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The source URL of the banner image */
  src: string;
  /** The alternative text for the banner image */
  alt?: string;
  /** An array of React nodes representing actions or buttons displayed on the banner */
  actions?: React.ReactNode[];
}

/**
 * Large that appears as one of the first items on a page.
 * It’s a primary visual element that is used to focus user attention on key content or promotions
 * @param props - {@link BannerProps}
 * @returns a React element
 */

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
      <Container className={styles.container} variation="big" spacingY>
        {children}

        {actions?.length ? <div className={styles.actions}>{actions}</div> : null}
      </Container>

      <img className={styles.image} alt={alt} src={src} />

      <Overlay />
    </div>
  </ThemeContextProvider>
);
