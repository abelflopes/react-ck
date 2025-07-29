import React, { useCallback, useState } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

/**
 * Props for configuring the Image component
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Required img alt description */
  alt: string;
  /** Whether the image should expand to fill container width. Defaults to false */
  fullWidth?: boolean;
  /** Fallback content to display when the image fails to load */
  fallback?: React.ReactNode;
}

/**
 * Enhanced image component with loading state handling
 * Shows skeleton placeholder while loading and handles errors
 */
export const Image = ({
  alt,
  className,
  hidden,
  onLoad,
  onError,
  fullWidth,
  fallback,
  ...otherProps
}: Readonly<ImageProps>): React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const computedOnLoad = useCallback<NonNullable<ImageProps["onLoad"]>>(
    (...args) => {
      setError(false);
      setLoading(false);
      onLoad?.(...args);
    },
    [onLoad],
  );

  const computedOnError = useCallback<NonNullable<ImageProps["onError"]>>(
    (...args) => {
      setError(true);
      setLoading(false);
      onError?.(...args);
    },
    [onError],
  );

  return (
    <>
      {(error || loading) && fallback}

      <img
        alt={alt}
        className={classNames(className, styles.root, {
          [`${styles.fullwidth}`]: fullWidth,
        })}
        onLoad={computedOnLoad}
        onError={computedOnError}
        {...otherProps}
        hidden={hidden || (Boolean(fallback) && (loading || error))}
      />
    </>
  );
};
