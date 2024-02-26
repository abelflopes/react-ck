import React, { useCallback, useState } from "react";
import styles from "./styles/index.module.scss";
import classNames from "classnames";
import { Skeleton } from "@react-ck/skeleton";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Required img alt description */
  alt: string;
}

export const Image = ({
  alt,
  className,
  hidden,
  onLoad,
  onError,
  ...otherProps
}: Readonly<ImageProps>): React.ReactElement => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  const computedOnLoad = useCallback<NonNullable<ImageProps["onLoad"]>>(
    (...args) => {
      setShouldDisplay(true);
      onLoad?.(...args);
    },
    [onLoad],
  );

  const computedOnError = useCallback<NonNullable<ImageProps["onError"]>>(
    (...args) => {
      setShouldDisplay(true);
      onError?.(...args);
    },
    [onError],
  );

  return (
    <>
      {!shouldDisplay && <Skeleton className={className} />}
      <img
        className={classNames(className, styles.root)}
        alt={alt}
        onLoad={computedOnLoad}
        onError={computedOnError}
        {...otherProps}
        hidden={hidden || !shouldDisplay}
      />
    </>
  );
};
