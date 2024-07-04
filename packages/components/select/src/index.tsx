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
  value?: React.SelectHTMLAttributes<HTMLSelectElement>["value"];
  multiple?: React.SelectHTMLAttributes<HTMLSelectElement>["multiple"];
}

/**
 * Select is a type of input that allows users to choose one or more options from a list of choices.
 * The options are hidden by default and revealed when a user interacts with an element. It shows the currently selected option in its default collapsed state.
 * @param props - {@link SelectProps}
 * @returns a React element
 */

const Select = ({
  children,
  className,
  onFocus,
  search: searchOptions,
  onChange: selectOnChange,
  value: selectValue,
  multiple: selectMultiple,
  ...props
}: Readonly<SelectProps>): React.ReactElement => {
  const searchRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[] | undefined>(undefined);
  const [search, setSearch] = useState("");

  const onNextRender = useNextRender();

  const filteredOptions = useMemo(
    () => options.filter((i) => i.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const handleChange = useCallback(
    (value: string) => {
      setSelectedValues([value]);

      setOpen(false);

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
    [onNextRender],
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

  return (
    <>
      <select
        ref={selectRef}
        multiple={selectMultiple}
        onChange={selectOnChange}
        value={selectedValues}>
        {selectedValues?.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <Input
        {...props}
        rootRef={inputRef}
        className={classNames(styles.root, className)}
        value={selectedValues?.join(", ") || ""}
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
              skin={selectedValues?.includes(i) ? "primary" : "default"}
              onClick={() => {
                handleChange(i);
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
