import React, { useCallback, useMemo, useState } from "react";
import { SnackbarContext, type SnackbarContextProps } from "./context";
import { generateId } from "./utils";
import { Layer } from "@react-ck/layers";
import { type ElementCreator, type Item } from "./types";
import { SnackbarItem } from "./SnackbarItem";
import * as styles from "./styles/index.module.scss";
import classNames from "classnames";

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  initialItems?: ElementCreator[];
}

export const Snackbar = ({
  initialItems,
  className,
  children,
  ...otherProps
}: Readonly<SnackbarProps>): React.ReactElement => {
  const [items, setItems] = useState<Item[]>(
    initialItems?.map((elementCreator) => {
      const id = generateId();
      const element = elementCreator(id);

      return {
        id,
        element: <SnackbarItem>{element}</SnackbarItem>,
      };
    }) ?? [],
  );

  const add = useCallback<SnackbarContextProps["add"]>((elementCreator) => {
    const id = generateId();
    const element = elementCreator(id);

    setItems((v) => [
      ...v,
      {
        id,
        element: <SnackbarItem>{element}</SnackbarItem>,
      },
    ]);

    return id;
  }, []);

  const remove = useCallback<SnackbarContextProps["remove"]>((id) => {
    setItems((v) => v.filter((i) => i.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      add,
      remove,
    }),
    [add, remove],
  );

  return (
    <Layer elevation="popup">
      {items.length > 0 && (
        <div className={classNames(className, styles.root)} {...otherProps}>
          {items.map((i) => i.element)}
        </div>
      )}

      <SnackbarContext.Provider value={contextValue}>{children}</SnackbarContext.Provider>
    </Layer>
  );
};
