import React, { useCallback, useMemo, useRef, useState } from "react";
import { SnackbarContext } from "./context";
import { generateId } from "./utils";
import { Layer } from "@react-ck/layers";
import {
  type SnackbarContextProps,
  type ElementCreator,
  type Item,
  type AddOptions,
} from "./types";
import { SnackbarItem } from "./SnackbarItem";
import styles from "./styles/index.module.scss";
import classNames from "classnames";

const durationMap = new Map<NonNullable<AddOptions["duration"]>, number>([
  ["short", 3000],
  ["medium", 6000],
  ["long", 12000],
]);

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  initialItems?: ElementCreator[];
}

export const Snackbar = ({
  initialItems,
  className,
  children,
  ...otherProps
}: Readonly<SnackbarProps>): React.ReactElement => {
  const timeoutMap = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

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

  const remove = useCallback<SnackbarContextProps["remove"]>((id) => {
    clearTimeout(timeoutMap.current[id]);

    setItems((v) => {
      const targetItem = v.find((i) => i.id === id);

      targetItem?.onRemove?.();

      return v.filter((i) => i.id !== targetItem?.id);
    });
  }, []);

  const add = useCallback<SnackbarContextProps["add"]>(
    (elementCreator, options) => {
      const id = generateId();
      const element = elementCreator(id);

      setItems((v) => [
        ...v,
        {
          id,
          onRemove: options?.onRemove,
          element: <SnackbarItem>{element}</SnackbarItem>,
        },
      ]);

      if (options?.duration) {
        timeoutMap.current[id] = setTimeout(() => {
          remove(id);
        }, durationMap.get(options.duration));
      }

      return id;
    },
    [remove],
  );

  const contextValue = useMemo(
    () => ({
      add,
      remove,
    }),
    [add, remove],
  );

  return (
    <>
      <SnackbarContext.Provider value={contextValue}>{children}</SnackbarContext.Provider>

      {items.length > 0 && (
        <Layer elevation="popup">
          <div className={classNames(className, styles.root)} {...otherProps}>
            {items.map((i) => (
              <React.Fragment key={i.id}>{i.element}</React.Fragment>
            ))}
          </div>
        </Layer>
      )}
    </>
  );
};
