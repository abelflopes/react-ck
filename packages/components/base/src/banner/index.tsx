import React from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Container } from "../container";
import { ThemeContextProvider } from "@react-ck/theme";
import { Overlay } from "../overlay";

/**
 * Props interface for the Banner component.
 * Defines the structure of a full-width banner with background image and actions.
 */
export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL of the background image */
  src: string;
  /** Accessibility text for the background image */
  alt?: string;
  /** Array of action elements (e.g., buttons) displayed at the bottom */
  actions?: React.ReactNode[];
}

/**
 * Full-width hero component for highlighting key content or promotions.
 * Features a background image with overlay and optional action buttons.
 *
 * @example
 * ```tsx
 * <Banner
 *   src="/hero-image.jpg"
 *   alt="Hero background"
 *   actions={[
 *     <Button>Learn More</Button>,
 *     <Button>Get Started</Button>
 *   ]}
 * >
 *   <Text variation="h1">Welcome</Text>
 *   <Text>Discover our platform</Text>
 * </Banner>
 * ```
 *
 * @param props - Component props {@link BannerProps}
 * @returns React element
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
      <Container className={styles.container} spacingY="l">
        {children}

        {actions?.length ? <div className={styles.actions}>{actions}</div> : null}
      </Container>

      <img className={styles.image} alt={alt} src={src} />

      <Overlay />
    </div>
  </ThemeContextProvider>
);
