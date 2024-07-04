import styles from "./styles/index.module.scss";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SelectOption } from "./SelectOption";
import { Dropdown, Menu } from "@react-ck/provisional";
import { Input, type InputProps } from "@react-ck/input";
import classNames from "classnames";
import { useNextRender, useOnClickOutside } from "@react-ck/react-utils";
import { EmptyState } from "@react-ck/empty-state";

const options = ["dog", "cat", "lion", "zebra", "shark"];

interface SelectProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "value"> {
  skin?: InputProps["skin"];
  placeholder: InputProps["placeholder"];
  children: React.ReactNode;
  search?: {
    placeholder: string;
    emptyStateMessage: (value: string) => React.ReactNode;
  };
  onChange?: React.SelectHTMLAttributes<HTMLSelectElement>["onChange"];
  value?: string | string[];
  name?: React.SelectHTMLAttributes<HTMLSelectElement>["name"];
  multiple?: React.SelectHTMLAttributes<HTMLSelectElement>["multiple"];
}

function valueAsArray(value: string | string[]): string[] {
  return value instanceof Array ? value : [value];
}

/**
 * Select is a type of input that allows users to choose one or more options from a list of choices.
 * The options are hidden by default and revealed when a user interacts with an element. It shows the currently selected option in its default collapsed state.
 * @param props - {@link SelectProps}
 * @returns a React element
 */

// eslint-disable-next-line max-lines-per-function
const Select = ({
  children,
  className,
  onFocus,
  search: searchOptions,
  onChange: selectOnChange,
  name: selectName,
  value: selectValue,
  multiple: selectMultiple,
  ...props
}: Readonly<SelectProps>): React.ReactElement => {
  const onNextRender = useNextRender();
  const searchRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedValues, setSelectedValues] = useState(selectValue);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(
    () => options.filter((i) => i.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const selectedValuesList = useMemo(() => valueAsArray(selectedValues ?? []), [selectedValues]);

  const handleChange = useCallback(
    (value: string, mode: "select" | "deselect") => {
      setSelectedValues((v) => {
        if (!selectMultiple && mode === "select") return value;
        else if (!selectMultiple && mode === "deselect") return undefined;
        else if (mode === "deselect" && v !== undefined)
          return valueAsArray(v).filter((i) => i !== value);
        else if (v !== undefined) return [...valueAsArray(v), value];
        return [value];
      });

      if (!selectMultiple) setOpen(false);

      onNextRender(() => {
        if (!selectRef.current)
          throw new Error("Select: unable to dispatch event to native element");

        selectRef.current.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );
      });
    },
    [onNextRender, selectMultiple],
  );

  useOnClickOutside(open, [dropdownRef, inputRef], () => {
    setOpen(false);
  });

  // Actions to do when dropdown opens
  useEffect(() => {
    if (!open) return;

    onNextRender(() => {
      searchRef.current?.focus();
    });
  }, [onNextRender, open]);

  // Actions to do when dropdown closes
  useEffect(() => {
    if (!open) return;

    setSearch("");
  }, [open]);

  useEffect(() => {
    setSelectedValues(selectValue);
  }, [selectValue]);

  return (
    <>
      <select
        ref={selectRef}
        name={selectName}
        multiple={selectMultiple}
        onChange={selectOnChange}
        value={selectedValues}>
        {selectedValuesList.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <Input
        {...props}
        rootRef={inputRef}
        className={classNames(styles.root, className)}
        value={selectedValuesList.join(", ") || ""}
        readOnly
        onFocus={(e) => {
          setOpen(true);
          onFocus?.(e);
        }}
      />

      <Dropdown
        anchorRef={inputRef}
        open={open}
        spacing="none"
        rootRef={dropdownRef}
        excludeAutoPosition={["left", "right", "start", "end", "full"]}>
        <Menu className={styles.menu}>
          {searchOptions ? (
            <>
              <Input
                rootRef={searchRef}
                value={search}
                type="search"
                placeholder={searchOptions?.placeholder}
                skin="ghost"
                className={styles.search_input}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Menu.Divider />
            </>
          ) : null}

          {children ? "" : ""}

          {filteredOptions.map((i) => (
            <Menu.Item
              key={i}
              skin={selectedValuesList.includes(i) ? "primary" : "default"}
              onClick={() => {
                handleChange(i, selectedValuesList.includes(i) ? "deselect" : "select");
              }}>
              {i}
            </Menu.Item>
          ))}

          {searchOptions && filteredOptions.length === 0 ? (
            <EmptyState>
              <span>{searchOptions.emptyStateMessage(search)}</span>
              {/* TODO: fix empty state flex */}
            </EmptyState>
          ) : null}
        </Menu>
      </Dropdown>
    </>
  );
};

Select.Option = SelectOption;

export { Select, type SelectProps };
