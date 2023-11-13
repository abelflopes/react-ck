import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useMemo, useState } from "react";
import { CardContext, type CardContextValue } from "./context";

export const Card = ({
  children,
  className,
  ...otherProps
}: Readonly<React.HTMLAttributes<HTMLDivElement>>): React.ReactElement => {
  const [contextValue, setContextValue] = useState<CardContextValue>({
    image: undefined,
  });

  const contextProps = useMemo(
    () => ({
      setValue: setContextValue,
    }),
    [],
  );

  return (
    <CardContext.Provider value={contextProps}>
      <div {...otherProps} className={classNames(styles.root, className)}>
        {contextValue.image && (
          <img
            {...contextValue.image}
            alt={contextValue.image.alt}
            className={classNames(styles.image, contextValue.image.className)}
          />
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </CardContext.Provider>
  );
};
