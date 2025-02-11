import styles from "./styles/index.module.scss";
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SelectOption } from "./SelectOption";
import { Dropdown, Menu } from "@react-ck/provisional";
import { Input } from "@react-ck/input";
import classNames from "classnames";
import { megeRefs, useNextRender } from "@react-ck/react-utils";
import { EmptyState } from "@react-ck/empty-state";
import { getChildrenData, simplifyString, valueAsArray } from "./utils";
import { type SelectProps, type ChangeHandler, type SelectOptionProps } from "./types";
import { SelectContext, type SelectContextProps } from "./context";
import { useFormFieldContext } from "@react-ck/form-field";

/* eslint-disable max-lines-per-function */

/**
 * Select is a type of input that allows users to choose one or more options from a list of choices.
 * The options are hidden by default and revealed when a user interacts with an element. It shows the currently selected option in its default collapsed state.
 * @param props - {@link SelectProps}
 * @returns a React element
 */

const Select = forwardRef<HTMLSelectElement, Readonly<SelectProps>>(
  (
    {
      id,
      skin = "default",
      placeholder,
      children,
      className,
      onFocus,
      onBlur,
      search: searchOptions,
      onChange: selectOnChange,
      name: selectName,
      value: userValue,
      multiple: selectMultiple,
      defaultValue,
      displayValueFormatter,
      allowDeselect = true,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const onNextRender = useNextRender();
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const rootElRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [internalValue, setInternalValue] = useState(userValue ?? defaultValue);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const formFieldContext = useFormFieldContext();

    const computedSkin = useMemo(
      () => formFieldContext?.skin ?? skin ?? "default",
      [formFieldContext?.skin, skin],
    );

    const computedId = useMemo(() => formFieldContext?.id ?? id, [formFieldContext?.id, id]);

    /** Children mapped to ChildrenData object to facilitate operations */
    const childrenData = useMemo(() => getChildrenData(children), [children]);

    /** Options list children filtered by user search  */
    const filteredOptions = useMemo(
      () =>
        childrenData
          .filter(
            (i) =>
              !search.length ||
              (i.textContent && simplifyString(i.textContent).includes(simplifyString(search))),
          )
          .map((i) => i.element),
      [childrenData, search],
    );

    /** Returns the internal value always as an array to facilitate operations  */
    const selectedValuesList = useMemo(
      () =>
        valueAsArray(internalValue ?? []).filter((i) =>
          childrenData.map((c) => c.computedValue).includes(i),
        ),
      [childrenData, internalValue],
    );

    const updateInternalValue = useCallback<ChangeHandler>(
      (value, mode) => {
        // eslint-disable-next-line complexity
        setInternalValue((v) => {
          if (!selectMultiple && mode === "select") return value;
          else if (!selectMultiple && mode === "deselect" && allowDeselect) return undefined;
          else if (mode === "deselect" && (allowDeselect || selectMultiple) && v !== undefined)
            return valueAsArray(v).filter((i) => i !== value);
          else if (v !== undefined) return [...valueAsArray(v), value];
          return [value];
        });
      },
      [allowDeselect, selectMultiple],
    );

    const handleFocus = useCallback(() => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      setOpen(true);
    }, []);

    const handleBlur = useCallback(() => {
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 150);
    }, []);

    /**
     * Handle change events trigger by the user
     * Also replicates the event on the native select
     */
    const handleChange = useCallback<ChangeHandler>(
      (value, mode) => {
        updateInternalValue(value, mode);

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
      [onNextRender, selectMultiple, updateInternalValue],
    );

    /** Context object propagated to select options  */
    const contextValue = useMemo<SelectContextProps>(
      () => ({
        handleChange,
        selectedValues: selectedValuesList,
      }),
      [handleChange, selectedValuesList],
    );

    /** Compute value label to display */

    const displayValue = useMemo(() => {
      if (selectedValuesList.length === 0) return undefined;

      const displayValue = childrenData
        .filter((i) => i.computedValue && selectedValuesList.includes(i.computedValue))
        .map((i) => i.textContent)
        .join(", ");

      return displayValueFormatter
        ? displayValueFormatter({
            selectedValues: selectedValuesList,
            childrenData,
            displayValue,
          })
        : displayValue;
    }, [childrenData, displayValueFormatter, selectedValuesList]);

    /** Actions to do when dropdown closes  */
    useEffect(() => {
      if (!open) return;
      // Clear search
      setSearch("");
    }, [open]);

    /** Set internal state with user provided value  */
    useEffect(() => {
      setInternalValue(userValue);
    }, [userValue]);

    /**Update internal values when children selected attribute changes */
    useEffect(() => {
      childrenData.forEach(({ selectOptionProps, computedValue, isSelectOption }) => {
        const { selected } = selectOptionProps || {};
        // skip if item is not a select option or the attribute is not set
        if (!isSelectOption || selected === undefined || computedValue === undefined) return;

        updateInternalValue(computedValue, selected ? "select" : "deselect");
      });
    }, [childrenData, updateInternalValue]);

    return (
      <>
        <div
          {...props}
          ref={rootElRef}
          role="button"
          tabIndex={disabled ? undefined : 0}
          className={classNames(
            styles.root,
            styles[`skin_${computedSkin}`],
            formFieldContext === undefined && styles.standalone,
            disabled && styles.disabled,
            className,
          )}
          onFocus={(e) => {
            handleFocus();
            onFocus?.(e);
          }}
          onBlur={(e) => {
            handleBlur();
            onBlur?.(e);
          }}>
          {displayValue || <span className={styles.placeholder}>{placeholder}</span>}

          <select
            ref={megeRefs([ref, selectRef])}
            id={computedId}
            name={selectName}
            multiple={selectMultiple}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled}
            value={internalValue}
            className={styles.native_element}
            onChange={(e) => {
              selectOnChange?.(e, selectedValuesList);
            }}>
            <option />
            {childrenData.map((i) => (
              <option key={`${i.computedValue}-${i.textContent}`} value={i.computedValue}>
                {i.textContent}
              </option>
            ))}
          </select>
        </div>

        <Dropdown
          anchorRef={rootElRef}
          open={open}
          spacing="s"
          rootRef={dropdownRef}
          excludeAutoPosition={["left", "right", "start", "end", "full"]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClose={() => {
            setOpen(false);
          }}>
          <Menu className={styles.menu}>
            {searchOptions ? (
              <>
                <Input
                  ref={(e) => {
                    e?.focus();
                  }}
                  value={search}
                  type="search"
                  placeholder={searchOptions.placeholder}
                  skin="ghost"
                  className={styles.search_input}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Menu.Divider />
              </>
            ) : null}

            <SelectContext.Provider value={contextValue}>{filteredOptions}</SelectContext.Provider>

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
  },
);
/* eslint-enable max-lines-per-function */

Select.displayName = "Select";

type SelectWithOption = typeof Select & {
  Option: typeof SelectOption;
};

// Add the Option property

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed for compound component definition with forward ref
const CompoundSelect: SelectWithOption = Select as SelectWithOption;

CompoundSelect.Option = SelectOption;

export { CompoundSelect as Select, type SelectProps, type SelectOptionProps };
