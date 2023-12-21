import classNames from "classnames";
import styles from "./styles/index.module.scss";
import React, { useCallback, useMemo, useState } from "react";
import { ModalContext, type ModalContextProps, type ModalContextValue } from "./context";
import { Card } from "@react-ck/card";
import { Overlay } from "@react-ck/overlay";
import { Icon } from "@react-ck/icon";
import { Button } from "@react-ck/button";
import { Text } from "@react-ck/text";
import { Layer } from "@react-ck/layers";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {}

// TODO: add annotation
// TODO: add a11y https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal

/**
 * @param props - {@link React.HTMLAttributes}
 * @returns a React element
 */

export const Modal = ({
  children,
  className,
  ...otherProps
}: Readonly<ModalProps>): React.ReactElement => {
  const [props, setProps] = useState<ModalContextValue>({
    header: undefined,
    footer: undefined,
  });

  const setContextValue = useCallback<ModalContextProps["setValue"]>((value) => {
    setProps((v) => ({ ...v, ...value }));
  }, []);

  const contextProps = useMemo<ModalContextProps>(
    () => ({
      setValue: setContextValue,
    }),
    [setContextValue],
  );

  return (
    <Layer elevation="overlay">
      <div {...otherProps} className={classNames(styles.root, className)}>
        <Overlay />
        <Card className={styles.card}>
          <ModalContext.Provider value={contextProps}>
            {props.header && (
              <header
                {...props.header}
                className={classNames(styles.header, props.header.className)}>
                <Text type="h3" as="p" margin={false}>
                  {props.header.heading}
                </Text>

                <Button skin="ghost" icon={<Icon name="close" />} />
              </header>
            )}
            <main className={styles.content}>{children}</main>
            {props.footer && (
              <footer
                {...props.footer}
                className={classNames(styles.footer, props.footer.className)}
              />
            )}
          </ModalContext.Provider>
        </Card>
      </div>
    </Layer>
  );
};
